document.addEventListener('DOMContentLoaded', function() {
    let currentMode = 'text';
    let uploadedImageData = null;
    let ai = null;

    // Initialize AI if configured
    if (typeof CONFIG !== 'undefined') {
        ai = new MathWizAI(CONFIG);
    }

    // Tab switching
    document.querySelectorAll('.input-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentMode = tab.dataset.mode;

            document.querySelectorAll('.input-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.getElementById('text-mode').style.display = currentMode === 'text' ? 'block' : 'none';
            document.getElementById('image-mode').style.display = currentMode === 'image' ? 'block' : 'none';
        });
    });

    // Image upload
    const uploadZone = document.getElementById('upload-zone');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImageBtn = document.getElementById('remove-image');

    uploadZone.addEventListener('click', () => imageInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--color-primary)';
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = '';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    });

    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imageInput.value = '';
        uploadedImageData = null;
        imagePreview.style.display = 'none';
        document.querySelector('.upload-prompt').style.display = 'flex';
    });

    function handleImageUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please upload an image file (PNG, JPG)');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('Image must be less than 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageData = e.target.result;
            previewImg.src = e.target.result;
            document.querySelector('.upload-prompt').style.display = 'none';
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Solve button
    document.getElementById('solve-btn').addEventListener('click', async () => {
        let problemText = '';

        if (currentMode === 'text') {
            problemText = document.getElementById('problem-input').value.trim();
            if (!problemText) {
                alert('Please enter a problem!');
                return;
            }
        } else if (currentMode === 'image') {
            if (!uploadedImageData) {
                alert('Please upload an image!');
                return;
            }
        }

        await solveProblem(problemText, uploadedImageData);
    });

    document.getElementById('new-problem-btn').addEventListener('click', () => {
        document.getElementById('solution-section').style.display = 'none';
        document.getElementById('input-section').style.display = 'block';
        document.getElementById('problem-input').value = '';
        uploadedImageData = null;
        imageInput.value = '';
        imagePreview.style.display = 'none';
        document.querySelector('.upload-prompt').style.display = 'flex';
    });

    async function solveProblem(problemText, imageData) {
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('loading-section').style.display = 'block';
        document.getElementById('solution-section').style.display = 'none';

        try {
            let solution;

            if (ai && ai.provider) {
                // Use AI to solve
                if (imageData) {
                    solution = await ai.solveFromImage(imageData);
                    problemText = solution.extractedText || 'Problem from uploaded image';
                } else {
                    solution = await ai.solveProblemWithAI(problemText);
                }
            } else {
                // Fallback to built-in solutions
                if (imageData) {
                    alert('AI is required for image analysis. Please add your API key to config.js');
                    document.getElementById('loading-section').style.display = 'none';
                    document.getElementById('input-section').style.display = 'block';
                    return;
                }
                solution = getSolution(problemText);
            }

            displaySolution(problemText, solution);
            document.getElementById('loading-section').style.display = 'none';
            document.getElementById('solution-section').style.display = 'block';
        } catch (error) {
            console.error('Error solving problem:', error);
            alert('Error: ' + error.message + '\n\nPlease check your API key in config.js');
            document.getElementById('loading-section').style.display = 'none';
            document.getElementById('input-section').style.display = 'block';
        }
    }

    // Built-in solutions for the 4 original problems (fallback)
    function getSolution(text) {
        const lower = text.toLowerCase();

        if (lower.includes('two cars') || (lower.includes('south') && lower.includes('west'))) {
            return getTwoCarsSolution();
        }
        if (lower.includes('plane') || lower.includes('radar')) {
            return getPlaneSolution();
        }
        if (lower.includes('balloon') || lower.includes('diameter')) {
            return getBalloonSolution();
        }
        if (lower.includes('cube') || lower.includes('edges')) {
            return getCubeSolution();
        }

        return {
            type: 'generic',
            steps: [{
                title: "AI Required",
                body: "This problem requires AI to solve. Please add your Anthropic Claude or OpenAI API key to config.js to solve any calculus problem.",
                equation: null,
                concept: "The app has 4 built-in problems but can solve unlimited problems with AI enabled.",
                mistake: null
            }],
            answer: "Configure AI in config.js to solve this problem",
            colors: {}
        };
    }

    function getTwoCarsSolution() {
        return {
            type: 'two-cars',
            steps: [
                {
                    title: "What do we know?",
                    body: "Okay, so picture this: two cars leave from the same spot at an intersection. One goes south at 60 m/hr (pretty fast!), and the other heads west at 25 m/hr (more of a Sunday driver). We want to know how fast the distance between them is growing after 2 hours.",
                    equation: "$$\\frac{dx}{dt} = 25 \\text{ m/hr (west)}, \\quad \\frac{dy}{dt} = 60 \\text{ m/hr (south)}, \\quad t = 2 \\text{ hours}$$",
                    concept: "The key insight: those speeds (60 and 25) are rates of change. They tell us how position changes over time. We're hunting for another rate - how the gap between them changes.",
                    mistake: "Don't mix up the speed (like 60 m/hr) with how far they've gone! Speed is the rate, distance is what changes because of that rate."
                },
                {
                    title: "Visualize the triangle",
                    body: "Here's the cool part - imagine looking down from above. One car goes south, one goes west, so they're making a right angle! The distance between them is the diagonal of that right triangle. Remember good old Pythagoras from geometry?",
                    equation: "$$z^2 = x^2 + y^2$$",
                    concept: "This equation is always true for these three distances - not just at 2 hours, but at any moment in time. That's what makes it so powerful for this problem.",
                    mistake: "People sometimes think this only works at one specific time, but nope! This triangle relationship holds throughout their entire journey."
                },
                {
                    title: "Take the derivative (the magic step!)",
                    body: "Since everything's changing with time, we differentiate both sides. Think of it like this: if the sides of the triangle are growing, the diagonal must be growing too, right? The derivative tells us exactly how those rates relate.",
                    equation: "$$\\frac{d}{dt}(z^2) = \\frac{d}{dt}(x^2 + y^2)$$$$2z\\frac{dz}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt}$$",
                    concept: "This is called implicit differentiation - we're finding how rates connect when variables are linked by an equation. It's like seeing how pulling one string affects the whole web.",
                    mistake: "The chain rule trips people up here! When you differentiate $z^2$, you get $2z$ times $\\frac{dz}{dt}$, not just $2z$. That extra $\\frac{dz}{dt}$ is crucial!"
                },
                {
                    title: "Calculate where they are",
                    body: "Let's figure out where each car ended up after cruising for 2 hours. Distance = speed × time, so it's straightforward multiplication. Then we use Pythagoras again to find how far apart they are.",
                    equation: "$$x = (25)(2) = 50 \\text{ m}$$$$y = (60)(2) = 120 \\text{ m}$$$$z = \\sqrt{50^2 + 120^2} = \\sqrt{2500 + 14400} = \\sqrt{16900} = 130 \\text{ m}$$",
                    concept: "We need these actual distances to plug into our rate equation. Think of it like: 'Where are they now? And given where they are now, how fast is the gap growing?'",
                    mistake: "Watch your units! Everything needs to be in the same units - if you mix up meters and kilometers, you'll get nonsense."
                },
                {
                    title: "Solve for the answer",
                    body: "Now we've got all the pieces! Plug everything into that differentiated equation and solve for $\\frac{dz}{dt}$ - that's what we've been after this whole time. The algebra is pretty straightforward from here.",
                    equation: "$$2(130)\\frac{dz}{dt} = 2(50)(25) + 2(120)(60)$$$$260\\frac{dz}{dt} = 2500 + 14400$$$$260\\frac{dz}{dt} = 16900$$$$\\frac{dz}{dt} = \\frac{16900}{260} = 65 \\text{ m/hr}$$",
                    concept: "What this means: even though one car is going 60 and the other 25, the distance between them grows at 65 m/hr. Not 85 (the sum), but 65! That's because they're moving at right angles, not directly away from each other.",
                    mistake: "Don't forget to include units in your final answer! It's m/hr because we're finding a rate (how fast the distance changes)."
                }
            ],
            answer: "$\\frac{dz}{dt} = 65 \\text{ m/hr}$",
            colors: { x: '#3b82f6', y: '#8b5cf6', z: '#ef4444' }
        };
    }

    function getPlaneSolution() {
        return {
            type: 'plane-radar',
            steps: [
                {
                    title: "Identify Given Information",
                    body: "The altitude stays constant at 1 mile, the plane flies horizontally at 500 mph, and we want the rate when the distance to the station is 2 miles.",
                    equation: "$$h = 1 \\text{ mile (constant)}, \\quad \\frac{dx}{dt} = 500 \\text{ mph}, \\quad s = 2 \\text{ miles}$$",
                    concept: "Note that $\\frac{dh}{dt} = 0$ because altitude is constant.",
                    mistake: "Don't assume the plane is directly above the station at the moment we're analyzing."
                },
                {
                    title: "Set Up the Pythagorean Relationship",
                    body: "The plane's horizontal distance from the point above the station ($x$), its altitude ($h$), and its straight-line distance to the station ($s$) form a right triangle.",
                    equation: "$$s^2 = x^2 + h^2$$",
                    concept: "Visualize the right triangle: $h$ is vertical (altitude), $x$ is horizontal, $s$ is the hypotenuse.",
                    mistake: "Don't confuse $s$ (distance to station) with $x$ (horizontal distance from overhead point)."
                },
                {
                    title: "Differentiate with Respect to Time",
                    body: "Apply implicit differentiation. Since $h$ is constant, $\\frac{dh}{dt} = 0$.",
                    equation: "$$2s\\frac{ds}{dt} = 2x\\frac{dx}{dt} + 2h\\frac{dh}{dt}$$$$2s\\frac{ds}{dt} = 2x\\frac{dx}{dt} + 0$$$$s\\frac{ds}{dt} = x\\frac{dx}{dt}$$",
                    concept: "When a variable is constant, its derivative is zero — this simplifies our equation.",
                    mistake: "Even though $h$ is constant, it still appears in the Pythagorean equation."
                },
                {
                    title: "Find Horizontal Distance $x$",
                    body: "We know $s = 2$ and $h = 1$, so we can find $x$ using the Pythagorean theorem.",
                    equation: "$$2^2 = x^2 + 1^2$$$$4 = x^2 + 1$$$$x^2 = 3$$$$x = \\sqrt{3} \\text{ miles}$$",
                    concept: "We need $x$ to solve for $\\frac{ds}{dt}$.",
                    mistake: "We take the positive root since distance is always positive."
                },
                {
                    title: "Solve for $\\frac{ds}{dt}$",
                    body: "Substitute all known values into our equation.",
                    equation: "$$2(2)\\frac{ds}{dt} = 2(\\sqrt{3})(500)$$$$4\\frac{ds}{dt} = 1000\\sqrt{3}$$$$\\frac{ds}{dt} = 250\\sqrt{3} \\approx 433.01 \\text{ mph}$$",
                    concept: "The distance to the station is increasing at approximately 433 mph.",
                    mistake: "Leave answer in exact form ($250\\sqrt{3}$) unless asked to approximate."
                }
            ],
            answer: "$\\frac{ds}{dt} = 250\\sqrt{3} \\approx 433 \\text{ mph}$",
            colors: { x: '#3b82f6', h: '#10b981', s: '#ef4444' }
        };
    }

    function getBalloonSolution() {
        return {
            type: 'balloon',
            steps: [
                {
                    title: "Identify Given Information",
                    body: "The diameter increases at 10 cm/sec, and we want to find the volume rate when diameter is 4 cm.",
                    equation: "$$\\frac{dd}{dt} = 10 \\text{ cm/sec}, \\quad d = 4 \\text{ cm} \\quad (r = 2 \\text{ cm})$$",
                    concept: "Remember that radius $r = \\frac{d}{2}$, so when $d = 4$, $r = 2$.",
                    mistake: "Don't confuse diameter and radius when using volume formulas."
                },
                {
                    title: "Express Volume in Terms of Diameter",
                    body: "The volume of a sphere is usually $V = \\frac{4}{3}\\pi r^3$, but since we're given diameter rate, let's use $r = \\frac{d}{2}$.",
                    equation: "$$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\left(\\frac{d}{2}\\right)^3 = \\frac{4}{3}\\pi \\cdot \\frac{d^3}{8} = \\frac{\\pi d^3}{6}$$",
                    concept: "Converting to diameter makes differentiation easier since we know $\\frac{dd}{dt}$.",
                    mistake: "Be careful with the algebra when cubing $\\frac{d}{2}$."
                },
                {
                    title: "Differentiate with Respect to Time",
                    body: "Apply the power rule and chain rule.",
                    equation: "$$\\frac{dV}{dt} = \\frac{\\pi}{6} \\cdot 3d^2 \\cdot \\frac{dd}{dt} = \\frac{\\pi d^2}{2} \\cdot \\frac{dd}{dt}$$",
                    concept: "The chain rule tells us to multiply by $\\frac{dd}{dt}$ when differentiating with respect to time.",
                    mistake: "Don't forget to multiply by $\\frac{dd}{dt}$ — that's the chain rule in action!"
                },
                {
                    title: "Substitute and Solve",
                    body: "Plug in $d = 4$ cm and $\\frac{dd}{dt} = 10$ cm/sec.",
                    equation: "$$\\frac{dV}{dt} = \\frac{\\pi (4)^2}{2} \\cdot 10 = \\frac{\\pi \\cdot 16}{2} \\cdot 10 = 8\\pi \\cdot 10 = 80\\pi \\text{ cm}^3\\text{/sec}$$$$\\frac{dV}{dt} \\approx 251.33 \\text{ cm}^3\\text{/sec}$$",
                    concept: "This is the rate at which air must be blown into the balloon.",
                    mistake: "Make sure units are consistent: cm for length, cm³/sec for volume rate."
                }
            ],
            answer: "$\\frac{dV}{dt} = 80\\pi \\approx 251.33 \\text{ cm}^3\\text{/sec}$",
            colors: { d: '#3b82f6', V: '#ef4444' }
        };
    }

    function getCubeSolution() {
        return {
            type: 'cube',
            steps: [
                {
                    title: "Identify Given Information",
                    body: "The volume increases at 1200 cm³/min when the edge length is 20 cm. We need to find the rate of change of the edge length.",
                    equation: "$$\\frac{dV}{dt} = 1200 \\text{ cm}^3\\text{/min}, \\quad s = 20 \\text{ cm}$$",
                    concept: "We know the volume rate and want to find the edge length rate.",
                    mistake: "Don't confuse what you're given ($\\frac{dV}{dt}$) with what you're finding ($\\frac{ds}{dt}$)."
                },
                {
                    title: "Write the Volume Formula",
                    body: "For a cube with edge length $s$:",
                    equation: "$$V = s^3$$",
                    concept: "This is the fundamental relationship between volume and edge length for a cube.",
                    mistake: "Don't use the surface area formula by mistake!"
                },
                {
                    title: "Differentiate with Respect to Time",
                    body: "Apply the power rule and chain rule.",
                    equation: "$$\\frac{dV}{dt} = 3s^2 \\cdot \\frac{ds}{dt}$$",
                    concept: "The power rule gives us $3s^2$, and the chain rule adds $\\frac{ds}{dt}$.",
                    mistake: "Remember to include $\\frac{ds}{dt}$ — we're differentiating with respect to time, not $s$."
                },
                {
                    title: "Solve for $\\frac{ds}{dt}$",
                    body: "Rearrange and substitute the known values.",
                    equation: "$$\\frac{ds}{dt} = \\frac{1}{3s^2} \\cdot \\frac{dV}{dt} = \\frac{1200}{3(20)^2} = \\frac{1200}{3 \\cdot 400} = \\frac{1200}{1200} = 1 \\text{ cm/min}$$",
                    concept: "The edges are growing at 1 cm per minute when the volume is increasing at 1200 cm³/min.",
                    mistake: "Don't forget to square the edge length: $s^2 = 20^2 = 400$, not 20."
                }
            ],
            answer: "$\\frac{ds}{dt} = 1 \\text{ cm/min}$",
            colors: { s: '#3b82f6', V: '#ef4444' }
        };
    }

    function displaySolution(problemText, solution) {
        document.getElementById('problem-display').textContent = problemText;

        const stepsContent = document.getElementById('steps-content');
        stepsContent.innerHTML = '';

        solution.steps.forEach((step, i) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';

            let stepHTML = `
                <div class="step-header">
                    <span class="step-number">${i + 1}</span>
                    <span class="step-title">${step.title}</span>
                </div>
                <div class="step-body">${step.body}</div>
            `;

            if (step.equation) {
                stepHTML += `<div class="step-equation">${step.equation}</div>`;
            }

            if (step.concept) {
                stepHTML += `<div class="step-concept"><strong>Concept:</strong> ${step.concept}</div>`;
            }

            if (step.mistake) {
                stepHTML += `<div class="step-mistake"><strong>Common Mistake:</strong> ${step.mistake}</div>`;
            }

            stepDiv.innerHTML = stepHTML;
            stepsContent.appendChild(stepDiv);
        });

        document.getElementById('answer-content').innerHTML = solution.answer;

        if (window.MathJax) {
            MathJax.typesetPromise([stepsContent, document.getElementById('answer-content')]).catch((err) => console.log(err));
        }

        drawVisualization(solution.type, solution.colors || {});

        if (solution.colors && Object.keys(solution.colors).length > 0) {
            const legendHTML = Object.entries(solution.colors).map(([variable, color]) => `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${color}"></div>
                    <span>$${variable}$ variable</span>
                </div>
            `).join('');
            document.getElementById('diagram-legend').innerHTML = legendHTML;

            if (window.MathJax) {
                MathJax.typesetPromise([document.getElementById('diagram-legend')]).catch((err) => console.log(err));
            }
        }
    }

    function drawVisualization(type, colors) {
        const canvas = document.getElementById('diagram-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 400;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.lineWidth = 2;

        if (type === 'two-cars') {
            const cx = 120, cy = 80;
            ctx.strokeStyle = '#d4d4d4';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx - 110, cy);
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, cy + 280);
            ctx.stroke();

            ctx.fillStyle = '#737373';
            ctx.fillText('West', cx - 120, cy + 5);
            ctx.fillText('South', cx + 10, cy + 300);

            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#171717';
            ctx.fillText('Start', cx + 10, cy - 5);

            const c1x = cx - 100, c1y = cy;
            ctx.fillStyle = colors.x || '#3b82f6';
            ctx.beginPath();
            ctx.arc(c1x, c1y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#171717';
            ctx.fillText('Car 1', c1x - 40, c1y - 12);
            ctx.fillStyle = '#737373';
            ctx.fillText('x = 50 m', c1x - 40, c1y + 20);

            const c2x = cx, c2y = cy + 260;
            ctx.fillStyle = colors.y || '#8b5cf6';
            ctx.beginPath();
            ctx.arc(c2x, c2y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#171717';
            ctx.fillText('Car 2', c2x + 15, c2y);
            ctx.fillStyle = '#737373';
            ctx.fillText('y = 120 m', c2x + 15, c2y + 15);

            ctx.strokeStyle = colors.z || '#ef4444';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = colors.z || '#ef4444';
            ctx.fillText('z = 130 m', (c1x + c2x) / 2 - 25, (c1y + c2y) / 2);

        } else if (type === 'plane-radar') {
            const rx = 250, ry = 320, scale = 100;

            ctx.strokeStyle = '#d4d4d4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, ry);
            ctx.lineTo(canvas.width, ry);
            ctx.stroke();
            ctx.fillStyle = '#737373';
            ctx.fillText('Ground', 20, ry + 20);

            ctx.fillStyle = '#171717';
            ctx.beginPath();
            ctx.arc(rx, ry, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText('Radar Station', rx - 45, ry + 25);

            ctx.strokeStyle = colors.h || '#10b981';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(rx, ry - scale);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = colors.h || '#10b981';
            ctx.fillText('h = 1 mi', rx + 10, ry - 50);

            const px = rx + Math.sqrt(3) * scale;
            const py = ry - scale;
            ctx.strokeStyle = colors.x || '#3b82f6';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(rx, py);
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = colors.x || '#3b82f6';
            ctx.fillText('x = √3 mi', (rx + px) / 2 - 25, py - 10);

            ctx.fillStyle = '#171717';
            ctx.beginPath();
            ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText('Plane', px + 12, py - 5);

            ctx.strokeStyle = colors.s || '#ef4444';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.fillStyle = colors.s || '#ef4444';
            ctx.fillText('s = 2 mi', (rx + px) / 2 + 15, (ry + py) / 2);

        } else if (type === 'balloon') {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            [25, 40, 55].forEach((r, i) => {
                const x = cx + (i - 1) * 140;
                const alpha = i === 1 ? 1 : 0.25;

                ctx.globalAlpha = alpha;
                ctx.fillStyle = colors.V || '#ef4444';
                ctx.beginPath();
                ctx.arc(x, cy, r, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#737373';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x, cy + r);
                ctx.lineTo(x, cy + r + 40);
                ctx.stroke();

                ctx.globalAlpha = 1;
                ctx.fillStyle = '#171717';
                const d = (i + 1) * 2;
                ctx.fillText(`d = ${d} cm`, x - 22, cy - r - 10);

                if (i === 1) {
                    ctx.fillStyle = colors.d || '#3b82f6';
                    ctx.strokeStyle = colors.d || '#3b82f6';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    ctx.moveTo(x - r, cy);
                    ctx.lineTo(x + r, cy);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            });
            ctx.globalAlpha = 1;

        } else if (type === 'cube') {
            const cx = canvas.width / 2, cy = canvas.height / 2;
            const size = 120, depth = 70;

            ctx.fillStyle = '#e5e5e5';
            ctx.strokeStyle = '#737373';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx + depth, cy - depth);
            ctx.lineTo(cx + depth + size, cy - depth);
            ctx.lineTo(cx + depth + size, cy - depth + size);
            ctx.lineTo(cx + depth, cy - depth + size);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#d4d4d4';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + depth, cy - depth);
            ctx.lineTo(cx + depth + size, cy - depth);
            ctx.lineTo(cx + size, cy);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fafafa';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + size, cy);
            ctx.lineTo(cx + size, cy + size);
            ctx.lineTo(cx, cy + size);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = colors.s || '#3b82f6';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy + size);
            ctx.lineTo(cx + size, cy + size);
            ctx.stroke();

            ctx.fillStyle = colors.s || '#3b82f6';
            ctx.fillText('s = 20 cm', cx + size / 2 - 30, cy + size + 20);

            ctx.fillStyle = '#737373';
            ctx.fillText('dV/dt = 1200 cm³/min', cx - 60, cy - 90);
        } else {
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'center';
            ctx.fillText('Diagram generated based on problem type', canvas.width / 2, canvas.height / 2);
        }
    }
});
