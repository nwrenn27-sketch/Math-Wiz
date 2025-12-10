// ========================================================
// MATH WIZ - MAIN APPLICATION SCRIPT
// ========================================================
// This file handles:
// - UI interactions (tabs, image upload, buttons)
// - Problem solving (AI or built-in solutions)
// - Solution rendering (steps, diagrams, LaTeX)
// ========================================================

// Wait for DOM to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    // ========================================================
    // STATE VARIABLES
    // ========================================================
    let currentMode = 'text';          // Current input mode: 'text' or 'image'
    let uploadedImageData = null;      // Base64 data of uploaded image
    let ai = null;                     // AI integration instance (if configured)

    // Initialize AI if API key is configured
    if (typeof CONFIG !== 'undefined') {
        ai = new MathWizAI(CONFIG);
    }

    // ========================================================
    // TAB SWITCHING (Text Input vs Image Upload)
    // ========================================================
    document.querySelectorAll('.input-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update current mode based on clicked tab
            currentMode = tab.dataset.mode;

            // Update active tab styling
            document.querySelectorAll('.input-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide corresponding input mode
            const textMode = document.getElementById('text-mode');
            const imageMode = document.getElementById('image-mode');

            if (textMode) textMode.style.display = currentMode === 'text' ? 'block' : 'none';
            if (imageMode) imageMode.style.display = currentMode === 'image' ? 'block' : 'none';
        });
    });

    // ========================================================
    // IMAGE UPLOAD FUNCTIONALITY
    // ========================================================
    const uploadZone = document.getElementById('upload-zone');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImageBtn = document.getElementById('remove-image');

    // Click upload zone to trigger file picker
    if (uploadZone && imageInput) {
        uploadZone.addEventListener('click', () => imageInput.click());

        // Drag-and-drop: Show blue border when dragging over
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--color-primary)';
        });

        // Drag-and-drop: Reset border when leaving
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = '';
        });

        // Drag-and-drop: Handle file drop
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = '';
            const file = e.dataTransfer.files[0];
            if (file) handleImageUpload(file);
        });
    }

    // Handle file selection via file picker
    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
        });
    }

    // Remove uploaded image (X button)
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // Don't trigger upload zone click
            if (imageInput) imageInput.value = '';
            uploadedImageData = null;
            if (imagePreview) imagePreview.style.display = 'none';
            const uploadPrompt = document.querySelector('.upload-prompt');
            if (uploadPrompt) uploadPrompt.style.display = 'flex';
        });
    }

    /**
     * Process uploaded image file
     * Validates file type and size, converts to base64
     */
    function handleImageUpload(file) {
        // Validate file type
        if (!file || !file.type.startsWith('image/')) {
            alert('Please upload an image file (PNG, JPG)');
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert('Image must be less than 10MB');
            return;
        }

        // Read file and convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageData = e.target.result;  // Store base64 data

            if (previewImg) {
                previewImg.src = e.target.result;  // Show preview
            }

            const uploadPrompt = document.querySelector('.upload-prompt');
            if (uploadPrompt) uploadPrompt.style.display = 'none';
            if (imagePreview) imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // ========================================================
    // SOLVE BUTTON HANDLER
    // ========================================================
    const solveBtn = document.getElementById('solve-btn');
    if (solveBtn) {
        solveBtn.addEventListener('click', async () => {
            let problemText = '';

            // Validate input based on current mode
            if (currentMode === 'text') {
                const problemInput = document.getElementById('problem-input');
                if (!problemInput) return;

                problemText = problemInput.value.trim();
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

            // Solve the problem (with AI or built-in solutions)
            await solveProblem(problemText, uploadedImageData);
        });
    }

    // ========================================================
    // NEW PROBLEM BUTTON - Reset UI
    // ========================================================
    const newProblemBtn = document.getElementById('new-problem-btn');
    if (newProblemBtn) {
        newProblemBtn.addEventListener('click', () => {
            // Hide solution, show input
            const solutionSection = document.getElementById('solution-section');
            const inputSection = document.getElementById('input-section');

            if (solutionSection) solutionSection.style.display = 'none';
            if (inputSection) inputSection.style.display = 'block';

            // Clear all inputs
            const problemInput = document.getElementById('problem-input');
            if (problemInput) problemInput.value = '';

            uploadedImageData = null;
            if (imageInput) imageInput.value = '';
            if (imagePreview) imagePreview.style.display = 'none';

            const uploadPrompt = document.querySelector('.upload-prompt');
            if (uploadPrompt) uploadPrompt.style.display = 'flex';
        });
    }

    // ========================================================
    // PROBLEM SOLVING LOGIC
    // ========================================================

    /**
     * Main function to solve a math problem
     * Uses AI if configured, otherwise falls back to built-in solutions
     * @param {string} problemText - Text description of problem
     * @param {string} imageData - Base64 image data (optional)
     */
    async function solveProblem(problemText, imageData) {
        // Get section elements
        const inputSection = document.getElementById('input-section');
        const loadingSection = document.getElementById('loading-section');
        const solutionSection = document.getElementById('solution-section');

        // Show loading spinner, hide other sections
        if (inputSection) inputSection.style.display = 'none';
        if (loadingSection) loadingSection.style.display = 'block';
        if (solutionSection) solutionSection.style.display = 'none';

        try {
            let solution;

            // Choose AI or built-in solution
            if (ai && ai.provider) {
                // AI is configured - use it to solve
                if (imageData) {
                    // Image upload: extract problem from image, then solve
                    solution = await ai.solveFromImage(imageData);
                    problemText = solution.extractedText || 'Problem from uploaded image';
                } else {
                    // Text input: solve directly
                    solution = await ai.solveProblemWithAI(problemText);
                }
            } else {
                // No AI configured - use built-in solutions
                if (imageData) {
                    // Image analysis requires AI
                    alert('AI is required for image analysis. Please add your API key to config.js');
                    if (loadingSection) loadingSection.style.display = 'none';
                    if (inputSection) inputSection.style.display = 'block';
                    return;
                }
                solution = getSolution(problemText);
            }

            // Display the solution
            displaySolution(problemText, solution);
            if (loadingSection) loadingSection.style.display = 'none';
            if (solutionSection) solutionSection.style.display = 'block';
        } catch (error) {
            // Handle errors (usually API key issues)
            console.error('Error solving problem:', error);
            alert('Error: ' + error.message + '\n\nPlease check your API key in config.js');
            if (loadingSection) loadingSection.style.display = 'none';
            if (inputSection) inputSection.style.display = 'block';
        }
    }

    // ========================================================
    // BUILT-IN SOLUTIONS (Fallback when AI not configured)
    // ========================================================

    /**
     * Match problem text to one of 4 built-in solutions
     * Returns error message if problem not recognized
     */
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

    // ========================================================
    // SOLUTION DISPLAY (Render steps, equations, diagram)
    // ========================================================

    /**
     * Display solution in the UI
     * Renders steps, equations (with MathJax), and diagram
     * @param {string} problemText - Original problem statement
     * @param {object} solution - Solution object with steps, answer, colors
     */
    function displaySolution(problemText, solution) {
        // Display the problem statement
        const problemDisplay = document.getElementById('problem-display');
        if (problemDisplay) {
            problemDisplay.textContent = problemText;
        }

        // Clear previous solution steps
        const stepsContent = document.getElementById('steps-content');
        if (!stepsContent) return;

        stepsContent.innerHTML = '';

        // Ensure solution has required properties
        if (!solution || !solution.steps) {
            console.error('Invalid solution object:', solution);
            return;
        }

        // Render each solution step
        solution.steps.forEach((step, i) => {
            // Skip invalid steps
            if (!step || typeof step !== 'object') return;

            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';

            // Build step HTML with number, title, and body
            let stepHTML = `
                <div class="step-header">
                    <span class="step-number">${i + 1}</span>
                    <span class="step-title">${step.title || 'Step ' + (i + 1)}</span>
                </div>
                <div class="step-body">${step.body || ''}</div>
            `;

            // Add equation if present (LaTeX will be rendered by MathJax)
            if (step.equation) {
                stepHTML += `<div class="step-equation">${step.equation}</div>`;
            }

            // Add concept callout if present
            if (step.concept) {
                stepHTML += `<div class="step-concept"><strong>Concept:</strong> ${step.concept}</div>`;
            }

            // Add mistake warning if present
            if (step.mistake) {
                stepHTML += `<div class="step-mistake"><strong>Common Mistake:</strong> ${step.mistake}</div>`;
            }

            stepDiv.innerHTML = stepHTML;
            stepsContent.appendChild(stepDiv);
        });

        // Display final answer
        const answerContent = document.getElementById('answer-content');
        if (answerContent && solution.answer) {
            answerContent.innerHTML = solution.answer;
        }

        // Render LaTeX equations with MathJax
        if (window.MathJax) {
            const elements = [stepsContent, document.getElementById('answer-content')].filter(el => el !== null);
            if (elements.length > 0) {
                MathJax.typesetPromise(elements).catch((err) => console.log('MathJax error:', err));
            }
        }

        // Draw diagram on canvas
        drawVisualization(solution.type, solution.colors || {}, solution.diagram || null);

        // Create color-coded legend
        const legendEl = document.getElementById('diagram-legend');
        if (legendEl) {
            if (solution.colors && Object.keys(solution.colors).length > 0) {
                const legendHTML = Object.entries(solution.colors).map(([variable, color]) => `
                    <div class="legend-item">
                        <div class="legend-color" style="background: ${color}"></div>
                        <span>$${variable}$ variable</span>
                    </div>
                `).join('');
                legendEl.innerHTML = legendHTML;

                // Render LaTeX in legend
                if (window.MathJax) {
                    MathJax.typesetPromise([legendEl]).catch((err) => console.log('MathJax error:', err));
                }
            } else {
                legendEl.innerHTML = '';
            }
        }
    }

    // ========================================================
    // DIAGRAM DRAWING (Canvas visualizations)
    // ========================================================

    /**
     * Draw visual diagram based on problem type or AI-generated description
     * Uses HTML5 Canvas API to draw color-coded diagrams
     * @param {string} type - Problem type (two-cars, plane, balloon, cube, or generic)
     * @param {object} colors - Color mapping for variables
     * @param {object} diagram - AI-generated diagram description (optional)
     */
    function drawVisualization(type, colors, diagram) {
        const canvas = document.getElementById('diagram-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 400;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.lineWidth = 2;

        // Ensure colors object exists
        colors = colors || {};

        // If AI provided a diagram description, use it
        if (diagram && diagram.type && diagram.type !== 'none') {
            drawDynamicDiagram(ctx, diagram, colors);
            return;
        }

        // Otherwise use built-in diagrams
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

    // ========================================================
    // DYNAMIC DIAGRAM RENDERER (AI-generated diagrams)
    // ========================================================

    /**
     * Draw diagram from AI-generated description
     * Interprets diagram JSON and renders shapes dynamically
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {object} diagram - AI diagram description
     * @param {object} colors - Color mapping
     */
    function drawDynamicDiagram(ctx, diagram, colors) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Color palette
        const colorMap = {
            'primary': '#3b82f6',
            'secondary': '#ef4444',
            'accent': '#10b981',
            'neutral': '#64748b'
        };

        // If no elements, show description text
        if (!diagram.elements || diagram.elements.length === 0) {
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'center';
            ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText(diagram.description || 'Diagram visualization', centerX, centerY - 10);
            ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillStyle = '#a3a3a3';
            ctx.fillText('(AI-generated diagram)', centerX, centerY + 10);
            return;
        }

        // Draw based on diagram type
        if (diagram.type === 'geometry') {
            drawGeometricDiagram(ctx, diagram, colors, colorMap);
        } else if (diagram.type === 'graph') {
            drawGraphDiagram(ctx, diagram, colors, colorMap);
        } else if (diagram.type === '3d') {
            draw3DDiagram(ctx, diagram, colors, colorMap);
        } else {
            // Generic rendering
            drawGenericDiagram(ctx, diagram, colors, colorMap);
        }

        // Add description text at bottom
        if (diagram.description) {
            ctx.fillStyle = '#737373';
            ctx.textAlign = 'center';
            ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText(diagram.description, centerX, height - 15);
        }
    }

    /**
     * Draw geometric diagram (triangles, circles, rectangles)
     */
    function drawGeometricDiagram(ctx, diagram, colors, colorMap) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Validate diagram has elements
        if (!diagram.elements || !Array.isArray(diagram.elements)) {
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'center';
            ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText('Diagram not available', centerX, centerY);
            return;
        }

        // Simple geometric layout
        diagram.elements.forEach((element, index) => {
            const colorKey = element.color || 'primary';
            const color = colors[element.label] || colorMap[colorKey] || colorMap.primary;

            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2.5;

            switch (element.shape) {
                case 'line':
                    // Draw line from center outward
                    const angle = (index / diagram.elements.length) * Math.PI * 2;
                    const length = 100;
                    const startX = centerX;
                    const startY = centerY;
                    const endX = centerX + Math.cos(angle) * length;
                    const endY = centerY + Math.sin(angle) * length;

                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();

                    // Label
                    if (element.label) {
                        ctx.fillStyle = '#171717';
                        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
                        ctx.fillText(element.label, (startX + endX) / 2, (startY + endY) / 2 - 10);
                    }
                    break;

                case 'circle':
                    const radius = 50;
                    const offsetX = (index - diagram.elements.length / 2) * 80;

                    ctx.beginPath();
                    ctx.arc(centerX + offsetX, centerY, radius, 0, Math.PI * 2);
                    ctx.stroke();

                    if (element.label) {
                        ctx.fillStyle = '#171717';
                        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
                        ctx.fillText(element.label, centerX + offsetX, centerY + radius + 20);
                    }
                    break;

                case 'rectangle':
                    const rectWidth = 80;
                    const rectHeight = 60;
                    const rectX = centerX - rectWidth / 2;
                    const rectY = centerY - rectHeight / 2 + index * 30;

                    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

                    if (element.label) {
                        ctx.fillStyle = '#171717';
                        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
                        ctx.fillText(element.label, centerX, centerY + index * 30);
                    }
                    break;

                case 'arrow':
                    // Draw arrow pointing right
                    const arrowStartX = centerX - 60;
                    const arrowEndX = centerX + 60;
                    const arrowY = centerY + index * 40 - 40;

                    ctx.beginPath();
                    ctx.moveTo(arrowStartX, arrowY);
                    ctx.lineTo(arrowEndX, arrowY);
                    ctx.stroke();

                    // Arrow head
                    ctx.beginPath();
                    ctx.moveTo(arrowEndX, arrowY);
                    ctx.lineTo(arrowEndX - 10, arrowY - 5);
                    ctx.lineTo(arrowEndX - 10, arrowY + 5);
                    ctx.closePath();
                    ctx.fill();

                    if (element.label) {
                        ctx.fillStyle = '#171717';
                        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
                        ctx.fillText(element.label, centerX, arrowY - 10);
                    }
                    break;

                case 'point':
                    const pointX = centerX + (index - diagram.elements.length / 2) * 80;
                    const pointY = centerY;

                    ctx.beginPath();
                    ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
                    ctx.fill();

                    if (element.label) {
                        ctx.fillStyle = '#171717';
                        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
                        ctx.fillText(element.label, pointX, pointY - 15);
                    }
                    break;

                case 'text':
                    ctx.fillStyle = color;
                    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(element.label || '', centerX, centerY + index * 25 - 30);
                    break;
            }
        });
    }

    /**
     * Draw graph diagram (coordinate system with curves)
     */
    function drawGraphDiagram(ctx, diagram, colors, colorMap) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const axisLength = 150;

        // Draw axes
        ctx.strokeStyle = '#d4d4d4';
        ctx.lineWidth = 1.5;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(centerX - axisLength, centerY);
        ctx.lineTo(centerX + axisLength, centerY);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - axisLength);
        ctx.lineTo(centerX, centerY + axisLength);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = '#737373';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('x', centerX + axisLength + 10, centerY + 5);
        ctx.fillText('y', centerX - 5, centerY - axisLength - 10);

        // Draw elements if available
        if (!diagram.elements || !Array.isArray(diagram.elements)) {
            return;
        }

        diagram.elements.forEach((element) => {
            const colorKey = element.color || 'primary';
            const color = colors[element.label] || colorMap[colorKey] || colorMap.primary;

            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2.5;

            if (element.shape === 'curve') {
                // Draw a simple curve
                ctx.beginPath();
                ctx.moveTo(centerX - 100, centerY);
                ctx.quadraticCurveTo(centerX, centerY - 80, centerX + 100, centerY);
                ctx.stroke();
            }
        });
    }

    /**
     * Draw 3D diagram (isometric view)
     */
    function draw3DDiagram(ctx) {
        // Simple isometric box
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const size = 80;
        const depth = 40;

        ctx.strokeStyle = '#171717';
        ctx.lineWidth = 2;

        // Front face
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        ctx.strokeRect(centerX - size/2, centerY - size/2, size, size);

        // Top face
        ctx.fillStyle = '#e5e5e5';
        ctx.beginPath();
        ctx.moveTo(centerX - size/2, centerY - size/2);
        ctx.lineTo(centerX - size/2 + depth, centerY - size/2 - depth);
        ctx.lineTo(centerX + size/2 + depth, centerY - size/2 - depth);
        ctx.lineTo(centerX + size/2, centerY - size/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right face
        ctx.fillStyle = '#d4d4d4';
        ctx.beginPath();
        ctx.moveTo(centerX + size/2, centerY - size/2);
        ctx.lineTo(centerX + size/2 + depth, centerY - size/2 - depth);
        ctx.lineTo(centerX + size/2 + depth, centerY + size/2 - depth);
        ctx.lineTo(centerX + size/2, centerY + size/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    /**
     * Draw generic diagram (fallback)
     */
    function drawGenericDiagram(ctx, diagram, colors, colorMap) {
        // Use geometric rendering as fallback
        drawGeometricDiagram(ctx, diagram, colors, colorMap);
    }

    // ========================================================
    // MAIN NAVIGATION TAB SWITCHING
    // ========================================================

    /**
     * Handle main navigation tab switching (Solve vs Practice)
     */
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab button
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        });
    });

    // ========================================================
    // PRACTICE TAB FUNCTIONALITY
    // ========================================================

    let selectedTopic = null;
    let selectedDifficulty = 'easy';
    let practiceCount = 0;
    let currentPracticeProblem = null;

    /**
     * Handle topic card selection
     */
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('selected'));

            // Select this topic
            card.classList.add('selected');
            selectedTopic = card.dataset.topic;
        });
    });

    /**
     * Handle difficulty button selection
     */
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));

            // Select this difficulty
            btn.classList.add('active');
            selectedDifficulty = btn.dataset.difficulty;
        });
    });

    /**
     * Generate practice problem button
     */
    const generateProblemBtn = document.getElementById('generate-problem-btn');
    if (generateProblemBtn) {
        generateProblemBtn.addEventListener('click', async () => {
            if (!selectedTopic) {
                alert('Please select a topic first!');
                return;
            }

            if (!ai || !ai.provider) {
                alert('AI is required for practice problems. Please add your API key to config.js');
                return;
            }

            // Show loading state
            const originalText = generateProblemBtn.textContent;
            generateProblemBtn.textContent = 'Generating...';
            generateProblemBtn.disabled = true;

            try {
                // Generate problem using AI
                currentPracticeProblem = await ai.generatePracticeProblem(selectedTopic, selectedDifficulty);

                // Display the problem
                displayPracticeProblem(currentPracticeProblem);

                // Show the problem display area
                const problemDisplay = document.getElementById('practice-problem-display');
                if (problemDisplay) problemDisplay.style.display = 'block';

                // Reset hint and solution visibility
                const hintEl = document.getElementById('practice-hint');
                const solutionEl = document.getElementById('practice-solution');
                if (hintEl) hintEl.style.display = 'none';
                if (solutionEl) solutionEl.style.display = 'none';

            } catch (error) {
                console.error('Error generating practice problem:', error);
                alert('Error generating problem: ' + error.message);
            } finally {
                generateProblemBtn.textContent = originalText;
                generateProblemBtn.disabled = false;
            }
        });
    }

    /**
     * Display practice problem in the UI
     */
    function displayPracticeProblem(problem) {
        // Validate problem object
        if (!problem) {
            console.error('Invalid practice problem:', problem);
            return;
        }

        // Display problem text
        const problemTextEl = document.getElementById('practice-problem-text');
        if (problemTextEl && problem.problem) {
            problemTextEl.textContent = problem.problem;
        }

        // Set hint text
        const hintTextEl = document.getElementById('practice-hint-text');
        if (hintTextEl && problem.hint) {
            hintTextEl.textContent = problem.hint;
        }

        // Build solution steps HTML
        let stepsHTML = '';
        if (problem.steps && Array.isArray(problem.steps)) {
            problem.steps.forEach((step, i) => {
                // Skip invalid steps
                if (!step || typeof step !== 'object') return;

                stepsHTML += `
                    <div class="step">
                        <div class="step-header">
                            <span class="step-number">${i + 1}</span>
                            <span class="step-title">${step.title || 'Step ' + (i + 1)}</span>
                        </div>
                        <div class="step-body">${step.body || ''}</div>
                        ${step.equation ? `<div class="step-equation">${step.equation}</div>` : ''}
                    </div>
                `;
            });
        }

        if (problem.explanation) {
            stepsHTML += `<p style="margin-top: var(--spacing-md); color: var(--color-text-secondary);">${problem.explanation}</p>`;
        }

        const solutionStepsEl = document.getElementById('practice-solution-steps');
        if (solutionStepsEl) {
            solutionStepsEl.innerHTML = stepsHTML;
        }

        const answerTextEl = document.getElementById('practice-answer-text');
        if (answerTextEl && problem.answer) {
            answerTextEl.innerHTML = problem.answer;
        }

        // Render LaTeX
        if (window.MathJax) {
            const elements = [
                document.getElementById('practice-problem-text'),
                document.getElementById('practice-solution-steps'),
                document.getElementById('practice-answer-text')
            ].filter(el => el !== null);

            if (elements.length > 0) {
                MathJax.typesetPromise(elements).catch((err) => console.log('MathJax error:', err));
            }
        }
    }

    /**
     * Show hint button
     */
    const showHintBtn = document.getElementById('show-hint-btn');
    if (showHintBtn) {
        showHintBtn.addEventListener('click', () => {
            const hintEl = document.getElementById('practice-hint');
            if (hintEl) {
                if (hintEl.style.display === 'none') {
                    hintEl.style.display = 'block';
                } else {
                    hintEl.style.display = 'none';
                }
            }
        });
    }

    /**
     * Reveal solution button
     */
    const revealSolutionBtn = document.getElementById('reveal-solution-btn');
    if (revealSolutionBtn) {
        revealSolutionBtn.addEventListener('click', () => {
            const solutionEl = document.getElementById('practice-solution');
            if (solutionEl) {
                if (solutionEl.style.display === 'none') {
                    solutionEl.style.display = 'block';

                    // Increment progress
                    practiceCount++;
                    updateProgress();
                } else {
                    solutionEl.style.display = 'none';
                }
            }
        });
    }

    /**
     * Next problem button
     */
    const nextProblemBtn = document.getElementById('next-problem-btn');
    if (nextProblemBtn) {
        nextProblemBtn.addEventListener('click', () => {
            // Trigger generate button click
            if (generateProblemBtn) generateProblemBtn.click();
        });
    }

    /**
     * Update progress tracker
     */
    function updateProgress() {
        const progressCount = document.getElementById('progress-count');
        if (progressCount) {
            progressCount.textContent = `${practiceCount} problem${practiceCount !== 1 ? 's' : ''} solved`;
        }

        // Update progress bar (max out at 10 problems)
        const percentage = Math.min((practiceCount / 10) * 100, 100);
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }
});
