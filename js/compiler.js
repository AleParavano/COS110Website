// COS110 OOP STUDY WEBSITE - JDOODLE COMPILER API WRAPPER

class CompilerAPI {
    constructor() {
        this.clientId = 'e88569616eeb2f699d91f07b6a073ae9';
        this.clientSecret = 'c2f11a63d797790779de8359c2b3f4421918f0211b2cb1817778112ad1b9819b';
        this.apiUrl = 'https://api.jdoodle.com/v1/execute';
        this.maxTimeout = 30000;
    }

    async execute(code, stdin = '') {
        try {
            const response = await Promise.race([
                fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: this.clientId,
                        clientSecret: this.clientSecret,
                        script: code,
                        language: 'cpp98',
                        versionIndex: '0',
                        stdin: stdin
                    })
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Compilation timeout')), this.maxTimeout)
                )
            ]);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            return {
                success: result.statusCode === 200,
                output: result.output || '',
                error: result.error || result.compileStdout || '',
                stderr: result.stderr || ''
            };
        } catch (error) {
            return {
                success: false,
                output: '',
                error: `Error: ${error.message}. Make sure your code is valid C++98.`,
                stderr: error.message
            };
        }
    }

    formatOutput(output) {
        if (!output) return '(No output)';
        return output.trim();
    }
}

window.compiler = new CompilerAPI();

async function runCode(codeElement, outputElement, loadingIndicator) {
    if (!codeElement || !outputElement) {
        console.error('Code or output element not found');
        return;
    }

    const code = codeElement.value || codeElement.textContent;
    
    outputElement.textContent = '⏳ Compiling and running...';
    outputElement.classList.remove('error', 'success');
    if (loadingIndicator) {
        loadingIndicator.textContent = '⏳';
    }

    try {
        if (!code.includes('main')) {
            throw new Error('Code must contain a main() function');
        }

        const result = await window.compiler.execute(code);

        outputElement.classList.remove('error', 'success');

        if (result.success) {
            outputElement.textContent = window.compiler.formatOutput(result.output);
            outputElement.classList.add('success');
        } else {
            const errorMsg = result.error || result.stderr || 'Unknown error occurred';
            outputElement.textContent = `Compilation Error:\n\n${errorMsg}`;
            outputElement.classList.add('error');
        }

        if (loadingIndicator) {
            loadingIndicator.textContent = '';
        }
    } catch (error) {
        outputElement.textContent = `Error: ${error.message}\n\nMake sure your code:\n- Has a main() function\n- Is valid C++98\n- Doesn't require external libraries`;
        outputElement.classList.add('error');
        if (loadingIndicator) {
            loadingIndicator.textContent = '';
        }
    }
}

function downloadCode(code, filename = 'program.cpp') {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

window.runCode = runCode;
window.downloadCode = downloadCode;
