// WORKING C++ COMPILER - USING SIMPLE BACKEND PROXY

async function runCode(codeElement, outputElement) {
    if (!codeElement || !outputElement) {
        console.error('Element not found');
        return;
    }

    const code = codeElement.value || codeElement.textContent;
    outputElement.textContent = '⏳ Compiling...';
    outputElement.classList.remove('error', 'success');

    try {
        if (!code.includes('main')) {
            throw new Error('Code must have a main() function');
        }

        // Use a simple backend proxy (no setup needed)
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: 'cpp',
                version: '*',
                files: [
                    {
                        name: 'main.cpp',
                        content: code
                    }
                ]
            })
        });

        const result = await response.json();

        if (result.run && result.run.stdout) {
            outputElement.textContent = result.run.stdout || '(no output)';
            outputElement.classList.add('success');
        } else if (result.run && result.run.stderr) {
            outputElement.textContent = 'Compilation Error:\n\n' + result.run.stderr;
            outputElement.classList.add('error');
        } else {
            outputElement.textContent = 'Error: ' + JSON.stringify(result);
            outputElement.classList.add('error');
        }
    } catch (error) {
        outputElement.textContent = 'Error: ' + error.message + '\n\nMake sure your code has a main() function';
        outputElement.classList.add('error');
    }
}

function downloadCode(code) {
    const link = document.createElement('a');
    link.href = 'data:text/plain,' + encodeURIComponent(code);
    link.download = 'program.cpp';
    link.click();
}

window.runCode = runCode;
window.downloadCode = downloadCode;