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

function downloadCode(codeElement) {
    // Get the code text from either textarea or div
    const code = codeElement.value || codeElement.textContent;
    
    // Create a Blob from the code string
    const blob = new Blob([code], { type: 'text/plain' });
    
    // Create URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'program.cpp';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
}

function downloadSkeleton(skeletonCode, filename = 'skeleton.cpp') {
    // Create a Blob from the skeleton code string
    const blob = new Blob([skeletonCode], { type: 'text/plain' });
    
    // Create URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
}

window.runCode = runCode;
window.downloadCode = downloadCode;
window.downloadSkeleton = downloadSkeleton;