// ========================================================
// MATH WIZ PRACTICE APP
// ========================================================
// Student-focused practice interface with step-by-step reveals
// No AI required - all problems are pre-loaded
// ========================================================

// State management
const appState = {
    selectedTopic: null,
    selectedDifficulty: null,
    currentProblem: null,
    currentStepIndex: -1, // -1 = not started, 0 = first step, etc.
    stepsRevealed: [],
    studentAnswer: null,
    answerIsCorrect: null,
    answerSubmitted: false
};

// ========================================================
// INITIALIZATION
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    setupKeyboardNavigation();
});

function initializeApp() {
    renderTopicGrid();
    showScreen('selection-screen');
}

// ========================================================
// TOPIC SELECTION
// ========================================================

function renderTopicGrid() {
    const grid = document.getElementById('topic-grid');
    grid.innerHTML = '';

    for (const topicId in TOPIC_INFO) {
        const topic = TOPIC_INFO[topicId];
        const topicCard = document.createElement('button');
        topicCard.className = 'topic-card';
        topicCard.setAttribute('data-topic', topicId);
        topicCard.setAttribute('role', 'listitem');
        topicCard.setAttribute('aria-label', `${topic.name}: ${topic.description}`);

        // Count total problems across all difficulties for this topic
        const topicProblems = PROBLEM_LIBRARY[topicId] || {};
        const total = Object.values(topicProblems).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
        const badgeText = total > 0 ? `${total} problems` : 'Coming soon';

        topicCard.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>
            <div class="topic-name">${topic.name}</div>
            <div class="topic-desc">${topic.description}</div>
            <div class="topic-badge">${badgeText}</div>
        `;

        topicCard.addEventListener('click', () => selectTopic(topicId));
        grid.appendChild(topicCard);
    }
}

function selectTopic(topicId) {
    appState.selectedTopic = topicId;

    // Highlight selected topic
    document.querySelectorAll('.topic-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-topic="${topicId}"]`).classList.add('selected');

    // If difficulty is already selected, show problems
    if (appState.selectedDifficulty) {
        showProblemList();
    }
}

function selectDifficulty(difficulty) {
    appState.selectedDifficulty = difficulty;

    // Update radio group
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-checked', 'false');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('selected');
    document.querySelector(`[data-difficulty="${difficulty}"]`).setAttribute('aria-checked', 'true');

    // If topic is already selected, show problems
    if (appState.selectedTopic) {
        showProblemList();
    }
}

function showProblemList() {
    const problems = getProblemsByTopicAndDifficulty(
        appState.selectedTopic,
        appState.selectedDifficulty
    );

    const problemList = document.getElementById('problem-list');
    const problemCards = document.getElementById('problem-cards');
    const problemListTitle = document.getElementById('problem-list-title');

    if (problems.length === 0) {
        problemListTitle.textContent = 'No problems available yet for this selection.';
        problemCards.innerHTML = '<p class="no-problems">Problems coming soon!</p>';
        problemList.classList.remove('hidden');
        return;
    }

    const topicName = TOPIC_INFO[appState.selectedTopic].name;
    const difficultyName = appState.selectedDifficulty.charAt(0).toUpperCase() +
                          appState.selectedDifficulty.slice(1);
    problemListTitle.textContent = `${topicName} - ${difficultyName} Problems:`;

    problemCards.innerHTML = '';

    problems.forEach((problem, index) => {
        const card = document.createElement('button');
        card.className = 'problem-card';
        card.setAttribute('aria-label', `Problem ${index + 1}: ${problem.title}`);

        card.innerHTML = `
            <div class="problem-number">${index + 1}</div>
            <div class="problem-card-title">${problem.title}</div>
        `;

        card.addEventListener('click', () => loadProblem(problem));
        problemCards.appendChild(card);
    });

    problemList.classList.remove('hidden');
}

// ========================================================
// PROBLEM SOLVING
// ========================================================

function loadProblem(problem) {
    appState.currentProblem = problem;
    appState.currentStepIndex = -1;
    appState.stepsRevealed = [];
    appState.studentAnswer = null;
    appState.answerIsCorrect = null;
    appState.answerSubmitted = false;

    // Switch to solver screen
    showScreen('solver-screen');

    // Display problem information
    document.getElementById('problem-title').textContent = problem.title;
    document.getElementById('problem-statement').textContent = problem.problem;
    document.getElementById('visual-description').textContent = problem.visual.description;

    // Reset answer input
    document.getElementById('student-answer-input').value = '';
    document.getElementById('answer-feedback').classList.add('hidden');
    document.getElementById('answer-input-container').classList.remove('hidden');

    // Reset steps display
    const stepsDisplay = document.getElementById('steps-display');
    stepsDisplay.innerHTML = '<div class="step-placeholder" id="step-placeholder"><p>Click "Show Next Step" to begin the solution</p></div>';

    // Reset progress
    updateProgress();

    // Hide final answer
    document.getElementById('final-answer').classList.add('hidden');

    // Reset button states
    document.getElementById('next-step-btn').disabled = false;
    document.getElementById('prev-step-btn').disabled = true;

    // Draw diagram
    drawDiagram(problem);

    // Render math
    MathJax.typesetPromise();
}

// ========================================================
// ANSWER SUBMISSION
// ========================================================

function submitAnswer() {
    const problem = appState.currentProblem;
    if (!problem) return;

    const studentInput = document.getElementById('student-answer-input').value.trim();
    if (!studentInput) {
        alert('Please enter an answer first!');
        return;
    }

    appState.studentAnswer = studentInput;
    appState.answerSubmitted = true;

    // Check if answer is correct
    appState.answerIsCorrect = checkAnswer(studentInput, problem.answer);

    // Show feedback
    displayAnswerFeedback();

    // Disable input after submission
    document.getElementById('student-answer-input').disabled = true;
    document.getElementById('submit-answer-btn').disabled = true;
}

function checkAnswer(studentAnswer, correctAnswer) {
    // Normalize both answers for comparison
    const normalize = (str) => {
        return str
            .toLowerCase()
            .replace(/\s+/g, '') // Remove whitespace
            .replace(/[\\${}]/g, '') // Remove LaTeX symbols
            .replace(/\\text\{([^}]+)\}/g, '$1') // Extract text from \text{}
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)') // Convert fractions
            .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)') // Convert sqrt
            .replace(/≈|~|approximately/g, '') // Remove approximation symbols
            .replace(/[^\w\d.\/\-+*()]/g, ''); // Keep only alphanumeric, operators, decimals
    };

    const normalizedStudent = normalize(studentAnswer);
    const normalizedCorrect = normalize(correctAnswer);

    // Check exact match
    if (normalizedStudent === normalizedCorrect) {
        return true;
    }

    // Extract numeric values and compare
    const extractNumber = (str) => {
        const match = str.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : null;
    };

    const studentNum = extractNumber(normalizedStudent);
    const correctNum = extractNumber(normalizedCorrect);

    if (studentNum !== null && correctNum !== null) {
        // Allow small floating point differences (within 0.01)
        return Math.abs(studentNum - correctNum) < 0.01;
    }

    // Check if student answer is contained in correct answer or vice versa
    if (normalizedStudent.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedStudent)) {
        return true;
    }

    return false;
}

function displayAnswerFeedback() {
    const feedbackDiv = document.getElementById('answer-feedback');
    const feedbackContent = document.getElementById('feedback-content');

    if (appState.answerIsCorrect) {
        feedbackContent.innerHTML = `
            <div class="feedback-correct">
                <span class="feedback-icon">✓</span>
                <div class="feedback-text">
                    <strong>Correct!</strong>
                    <p>Great job! Your answer is correct. Feel free to view the solution steps to see the detailed work.</p>
                </div>
            </div>
        `;
        feedbackDiv.classList.remove('hidden');
        feedbackDiv.classList.add('correct');
        feedbackDiv.classList.remove('incorrect');
    } else {
        feedbackContent.innerHTML = `
            <div class="feedback-incorrect">
                <span class="feedback-icon">✗</span>
                <div class="feedback-text">
                    <strong>Not quite right</strong>
                    <p>Your answer: <code>${appState.studentAnswer}</code></p>
                    <p>That's not the answer we're looking for. Check out the solution steps to see where you might have made a mistake!</p>
                </div>
            </div>
        `;
        feedbackDiv.classList.remove('hidden');
        feedbackDiv.classList.add('incorrect');
        feedbackDiv.classList.remove('correct');
    }

    // Render any math in the feedback
    MathJax.typesetPromise([feedbackContent]);
}

function showNextStep() {
    const problem = appState.currentProblem;
    if (!problem) return;

    const nextIndex = appState.currentStepIndex + 1;
    if (nextIndex >= problem.steps.length) {
        // All steps shown, reveal answer
        revealAnswer();
        return;
    }

    appState.currentStepIndex = nextIndex;
    appState.stepsRevealed.push(nextIndex);

    renderStep(problem.steps[nextIndex], nextIndex);
    updateProgress();
    updateButtonStates();

    // Highlight diagram elements for this step
    if (problem.steps[nextIndex].highlightElements) {
        highlightDiagramElements(problem.steps[nextIndex].highlightElements);
    }
}

function showPreviousStep() {
    if (appState.currentStepIndex <= 0) return;

    appState.currentStepIndex--;
    updateProgress();
    updateButtonStates();

    // Scroll to current step
    const stepElements = document.querySelectorAll('.solution-step');
    if (stepElements[appState.currentStepIndex]) {
        stepElements[appState.currentStepIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function renderStep(step, index) {
    const stepsDisplay = document.getElementById('steps-display');

    // Remove placeholder if it exists
    const placeholder = document.getElementById('step-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    const stepDiv = document.createElement('div');
    stepDiv.className = 'solution-step';
    stepDiv.setAttribute('role', 'article');
    stepDiv.setAttribute('aria-label', `Step ${index + 1}: ${step.title}`);

    stepDiv.innerHTML = `
        <div class="step-header">
            <span class="step-number">Step ${index + 1}</span>
            <h3 class="step-title">${step.title}</h3>
        </div>
        <div class="step-body">
            <p class="step-text">${step.body}</p>
            ${step.equation ? `<div class="step-equation">${step.equation}</div>` : ''}
            ${step.concept ? `<div class="step-concept"><strong>💡 Key Concept:</strong> ${step.concept}</div>` : ''}
            ${step.mistake ? `<div class="step-mistake"><strong>⚠️ Common Mistake:</strong> ${step.mistake}</div>` : ''}
        </div>
    `;

    stepsDisplay.appendChild(stepDiv);

    // Render math in the new step
    MathJax.typesetPromise([stepDiv]);

    // Smooth scroll to new step
    stepDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showAllSteps() {
    const problem = appState.currentProblem;
    if (!problem) return;

    // Remove placeholder
    const placeholder = document.getElementById('step-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    // Clear existing steps
    const stepsDisplay = document.getElementById('steps-display');
    stepsDisplay.innerHTML = '';

    // Render all steps at once
    problem.steps.forEach((step, index) => {
        renderStep(step, index);
    });

    appState.currentStepIndex = problem.steps.length - 1;
    appState.stepsRevealed = problem.steps.map((_, i) => i);

    updateProgress();
    updateButtonStates();
    revealAnswer();
}

function revealAnswer() {
    const problem = appState.currentProblem;
    if (!problem) return;

    const answerDiv = document.getElementById('final-answer');
    const answerContent = document.getElementById('answer-content');

    answerContent.innerHTML = problem.answer;
    answerDiv.classList.remove('hidden');

    // Render math in answer
    MathJax.typesetPromise([answerContent]);

    // Disable next button
    document.getElementById('next-step-btn').disabled = true;

    // Smooth scroll to answer
    answerDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function resetSolution() {
    const problem = appState.currentProblem;
    if (!problem) return;

    appState.currentStepIndex = -1;
    appState.stepsRevealed = [];

    // Reset steps display
    const stepsDisplay = document.getElementById('steps-display');
    stepsDisplay.innerHTML = '<div class="step-placeholder" id="step-placeholder"><p>Click "Show Next Step" to begin the solution</p></div>';

    // Hide answer
    document.getElementById('final-answer').classList.add('hidden');

    // Reset progress
    updateProgress();
    updateButtonStates();

    // Scroll to top
    document.getElementById('solver-screen').scrollIntoView({ behavior: 'smooth' });
}

function updateProgress() {
    const problem = appState.currentProblem;
    if (!problem) return;

    const progressText = document.getElementById('progress-text');
    const totalSteps = problem.steps.length;
    const currentStep = appState.currentStepIndex + 1;

    if (appState.currentStepIndex === -1) {
        progressText.textContent = 'Not started';
    } else if (currentStep >= totalSteps) {
        progressText.textContent = `Complete (${totalSteps} steps)`;
    } else {
        progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    }
}

function updateButtonStates() {
    const problem = appState.currentProblem;
    if (!problem) return;

    const nextBtn = document.getElementById('next-step-btn');
    const prevBtn = document.getElementById('prev-step-btn');

    // Enable/disable previous button
    prevBtn.disabled = appState.currentStepIndex <= 0;

    // Enable/disable next button
    nextBtn.disabled = appState.currentStepIndex >= problem.steps.length;
}

// ========================================================
// DIAGRAM RENDERING
// ========================================================

function drawDiagram(problem) {
    const canvas = document.getElementById('diagram-canvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on problem type
    switch (problem.visual.type) {
        case 'two-cars':
            drawTwoCars(ctx, problem.colors);
            break;
        case 'plane-radar':
            drawPlaneRadar(ctx, problem.colors);
            break;
        case 'balloon':
            drawBalloon(ctx, problem.colors);
            break;
        case 'cube':
            drawCube(ctx, problem.colors);
            break;
        case 'function-graph':
            drawFunctionGraph(ctx, problem.visual, problem.colors);
            break;
        default:
            drawGenericDiagram(ctx);
    }
}

function drawTwoCars(ctx, colors) {
    const centerX = 300;
    const centerY = 200;
    const westDist = 150;
    const southDist = 200;

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 50);
    ctx.lineTo(centerX, 350);
    ctx.moveTo(100, centerY);
    ctx.lineTo(500, centerY);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px sans-serif';
    ctx.fillText('North', centerX + 10, 70);
    ctx.fillText('South', centerX + 10, 340);
    ctx.fillText('East', 470, centerY - 10);
    ctx.fillText('West', 120, centerY - 10);

    // Draw triangle
    ctx.strokeStyle = colors.z || '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); // Origin
    ctx.lineTo(centerX - westDist, centerY); // West car
    ctx.lineTo(centerX - westDist, centerY + southDist); // Corner
    ctx.closePath();
    ctx.stroke();

    // Draw car icons
    ctx.fillStyle = colors.x || '#3b82f6';
    ctx.fillRect(centerX - westDist - 15, centerY - 10, 30, 20);
    ctx.fillText('x', centerX - westDist/2, centerY - 10);

    ctx.fillStyle = colors.y || '#8b5cf6';
    ctx.fillRect(centerX - westDist - 10, centerY + southDist - 15, 20, 30);
    ctx.fillText('y', centerX - westDist - 30, centerY + southDist/2);

    ctx.fillStyle = colors.z || '#ef4444';
    ctx.fillText('z', centerX - westDist/2 - 30, centerY + southDist/2);

    // Draw origin point
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('Origin', centerX + 10, centerY + 20);
}

function drawPlaneRadar(ctx, colors) {
    const stationX = 300;
    const stationY = 300;
    const altitude = 100;
    const horizontalDist = 173; // sqrt(3) * 100 ≈ 173

    // Draw ground
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, stationY);
    ctx.lineTo(500, stationY);
    ctx.stroke();

    // Draw radar station
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(stationX - 10, stationY - 40, 20, 40);
    ctx.beginPath();
    ctx.arc(stationX, stationY - 40, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('Radar Station', stationX - 50, stationY + 20);

    // Draw plane
    const planeX = stationX + horizontalDist;
    const planeY = stationY - altitude;

    ctx.fillStyle = colors.x || '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(planeX, planeY);
    ctx.lineTo(planeX - 20, planeY + 10);
    ctx.lineTo(planeX + 20, planeY + 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillText('Plane', planeX + 10, planeY);

    // Draw right triangle
    ctx.strokeStyle = colors.s || '#ef4444';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(stationX, stationY); // Station
    ctx.lineTo(planeX, planeY); // Plane
    ctx.stroke();

    ctx.strokeStyle = colors.h || '#10b981';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(planeX, planeY); // Plane
    ctx.lineTo(planeX, stationY); // Down to ground
    ctx.stroke();

    ctx.strokeStyle = colors.x || '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(stationX, stationY); // Station
    ctx.lineTo(planeX, stationY); // Horizontal
    ctx.stroke();

    // Labels
    ctx.fillStyle = colors.h || '#10b981';
    ctx.fillText('h = 1 mi', planeX + 10, planeY + altitude/2);

    ctx.fillStyle = colors.x || '#3b82f6';
    ctx.fillText('x', stationX + horizontalDist/2, stationY - 10);

    ctx.fillStyle = colors.s || '#ef4444';
    ctx.fillText('s', stationX + horizontalDist/2 - 30, planeY + altitude/2);
}

function drawBalloon(ctx, colors) {
    const centerX = 300;
    const centerY = 200;
    const radius = 80;

    // Draw balloon sphere
    const gradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 10, centerX, centerY, radius);
    gradient.addColorStop(0, '#fecaca');
    gradient.addColorStop(1, '#ef4444');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = colors.d || '#3b82f6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw diameter line
    ctx.strokeStyle = colors.d || '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();

    // Draw diameter arrows
    ctx.fillStyle = colors.d || '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX - radius + 10, centerY - 5);
    ctx.lineTo(centerX - radius + 10, centerY + 5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius - 10, centerY - 5);
    ctx.lineTo(centerX + radius - 10, centerY + 5);
    ctx.closePath();
    ctx.fill();

    // Label
    ctx.font = '16px sans-serif';
    ctx.fillText('d (diameter)', centerX - 50, centerY - radius - 10);

    // Draw balloon string
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + radius);
    ctx.lineTo(centerX, centerY + radius + 60);
    ctx.stroke();
}

function drawCube(ctx, colors) {
    const centerX = 300;
    const centerY = 200;
    const size = 120;

    // Draw 3D cube using isometric projection
    const depth = size * 0.6;

    // Back face
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX + depth, centerY - depth, size, size);

    // Front face
    ctx.strokeStyle = colors.s || '#3b82f6';
    ctx.lineWidth = 3;
    ctx.strokeRect(centerX, centerY, size, size);

    // Connect corners
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + depth, centerY - depth);
    ctx.moveTo(centerX + size, centerY);
    ctx.lineTo(centerX + size + depth, centerY - depth);
    ctx.moveTo(centerX, centerY + size);
    ctx.lineTo(centerX + depth, centerY + size - depth);
    ctx.moveTo(centerX + size, centerY + size);
    ctx.lineTo(centerX + size + depth, centerY + size - depth);
    ctx.stroke();

    // Label edge
    ctx.fillStyle = colors.s || '#3b82f6';
    ctx.font = '16px sans-serif';
    ctx.fillText('s (edge)', centerX + size/2 - 30, centerY + size + 30);

    // Draw arrow for edge
    ctx.strokeStyle = colors.s || '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + size + 10);
    ctx.lineTo(centerX + size, centerY + size + 10);
    ctx.stroke();

    // Arrows
    ctx.fillStyle = colors.s || '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + size + 10);
    ctx.lineTo(centerX + 5, centerY + size + 5);
    ctx.lineTo(centerX + 5, centerY + size + 15);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX + size, centerY + size + 10);
    ctx.lineTo(centerX + size - 5, centerY + size + 5);
    ctx.lineTo(centerX + size - 5, centerY + size + 15);
    ctx.closePath();
    ctx.fill();
}

function drawGenericDiagram(ctx) {
    ctx.fillStyle = '#e5e7eb';
    ctx.font = '16px sans-serif';
    ctx.fillText('Diagram will appear here', 220, 200);
}

function drawFunctionGraph(ctx, visual, colors) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;

    const xRange = visual.xRange || [-5, 5];
    const yRange = visual.yRange || [-5, 5];
    const xMin = xRange[0], xMax = xRange[1];
    const yMin = yRange[0], yMax = yRange[1];

    // Helper function to convert mathematical coordinates to canvas coordinates
    const toCanvasX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toCanvasY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Helper function to safely evaluate mathematical expressions
    const evaluateFunction = (expr, x) => {
        try {
            // Replace common math notation with JavaScript
            const jsExpr = expr
                .replace(/\^/g, '**')
                .replace(/(\d)x/g, '$1*x')
                .replace(/x/g, `(${x})`);
            return eval(jsExpr);
        } catch (e) {
            return NaN;
        }
    };

    // Draw axes
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
        const y0 = toCanvasY(0);
        ctx.beginPath();
        ctx.moveTo(padding, y0);
        ctx.lineTo(width - padding, y0);
        ctx.stroke();

        // X-axis arrow
        ctx.fillStyle = '#d1d5db';
        ctx.beginPath();
        ctx.moveTo(width - padding, y0);
        ctx.lineTo(width - padding - 10, y0 - 5);
        ctx.lineTo(width - padding - 10, y0 + 5);
        ctx.closePath();
        ctx.fill();
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
        const x0 = toCanvasX(0);
        ctx.beginPath();
        ctx.moveTo(x0, padding);
        ctx.lineTo(x0, height - padding);
        ctx.stroke();

        // Y-axis arrow
        ctx.fillStyle = '#d1d5db';
        ctx.beginPath();
        ctx.moveTo(x0, padding);
        ctx.lineTo(x0 - 5, padding + 10);
        ctx.lineTo(x0 + 5, padding + 10);
        ctx.closePath();
        ctx.fill();
    }

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, padding);
        ctx.lineTo(canvasX, height - padding);
        ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(padding, canvasY);
        ctx.lineTo(width - padding, canvasY);
        ctx.stroke();
    }

    // Draw axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        const canvasX = toCanvasX(x);
        const y0 = toCanvasY(0);
        const labelY = (yMin <= 0 && yMax >= 0) ? y0 + 15 : height - padding + 15;
        ctx.fillText(x.toString(), canvasX, labelY);
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        const canvasY = toCanvasY(y);
        const x0 = toCanvasX(0);
        const labelX = (xMin <= 0 && xMax >= 0) ? x0 - 10 : padding - 10;
        ctx.fillText(y.toString(), labelX, canvasY + 4);
    }

    // Draw the function
    if (visual.function) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();

        let firstPoint = true;
        const steps = 500;

        for (let i = 0; i <= steps; i++) {
            const x = xMin + (i / steps) * (xMax - xMin);
            const y = evaluateFunction(visual.function, x);

            if (!isNaN(y) && isFinite(y) && y >= yMin - 10 && y <= yMax + 10) {
                const canvasX = toCanvasX(x);
                const canvasY = toCanvasY(y);

                if (firstPoint) {
                    ctx.moveTo(canvasX, canvasY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                firstPoint = true;
            }
        }

        ctx.stroke();
    }

    // Draw vertical asymptotes
    if (visual.asymptotes) {
        ctx.strokeStyle = colors.asymptote || '#9ca3af';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

        visual.asymptotes.forEach(asymptote => {
            if (asymptote.type === 'vertical') {
                const canvasX = toCanvasX(asymptote.x);
                ctx.beginPath();
                ctx.moveTo(canvasX, padding);
                ctx.lineTo(canvasX, height - padding);
                ctx.stroke();
            }
        });

        ctx.setLineDash([]);
    }

    // Draw critical points
    if (visual.criticalPoints && visual.criticalPoints.length > 0) {
        visual.criticalPoints.forEach(point => {
            const canvasX = toCanvasX(point.x);
            const canvasY = toCanvasY(point.y);

            // Draw the point
            ctx.fillStyle = colors.criticalPoint || '#ef4444';
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
            ctx.fill();

            // Add a white border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label the point
            ctx.fillStyle = colors.criticalPoint || '#ef4444';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';

            let label = `(${point.x}, ${point.y})`;
            if (point.type === 'max') {
                label += ' max';
            } else if (point.type === 'min') {
                label += ' min';
            }

            ctx.fillText(label, canvasX, canvasY - 15);
        });
    }

    // Draw inflection points
    if (visual.inflectionPoints && visual.inflectionPoints.length > 0) {
        visual.inflectionPoints.forEach(point => {
            const canvasX = toCanvasX(point.x);
            const canvasY = toCanvasY(point.y);

            // Draw the point with a different style (square)
            ctx.fillStyle = colors.inflectionPoint || '#10b981';
            ctx.fillRect(canvasX - 6, canvasY - 6, 12, 12);

            // Add a white border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(canvasX - 6, canvasY - 6, 12, 12);

            // Label the point
            ctx.fillStyle = colors.inflectionPoint || '#10b981';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';

            let label = `(${point.x}, ${point.y}) inflection`;
            ctx.fillText(label, canvasX, canvasY - 15);
        });
    }

    // Draw limit point
    if (visual.limitPoint) {
        const point = visual.limitPoint;
        const canvasX = toCanvasX(point.x);
        const canvasY = toCanvasY(point.y);

        if (point.isHole) {
            // Draw a hollow circle for removable discontinuity
            ctx.strokeStyle = colors.limitPoint || '#ef4444';
            ctx.fillStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } else {
            // Draw a solid circle for continuous limit
            ctx.fillStyle = colors.limitPoint || '#ef4444';
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
            ctx.fill();

            // Add a white border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Label the limit point
        ctx.fillStyle = colors.limitPoint || '#ef4444';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';

        let label = `(${point.x}, ${point.y})`;
        if (point.approaching === 'infinity') {
            label = `limit = ${point.y}`;
        } else if (point.isHole) {
            label += ' (hole)';
        }
        ctx.fillText(label, canvasX, canvasY - 15);

        // Draw horizontal asymptote line if approaching infinity
        if (point.approaching === 'infinity' && point.horizontalAsymptote !== undefined) {
            ctx.strokeStyle = colors.limitPoint || '#ef4444';
            ctx.lineWidth = 2;
            ctx.setLineDash([10, 5]);
            const asymY = toCanvasY(point.horizontalAsymptote);
            ctx.beginPath();
            ctx.moveTo(padding, asymY);
            ctx.lineTo(width - padding, asymY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Label the asymptote
            ctx.fillStyle = colors.limitPoint || '#ef4444';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`y = ${point.horizontalAsymptote}`, width - padding - 5, asymY - 5);
        }
    }

    // Add function label
    if (visual.function) {
        ctx.fillStyle = '#1f2937';
        ctx.font = 'italic 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`f(x) = ${visual.function.replace(/\*/g, '')}`, padding, padding - 20);
    }
}

function highlightDiagramElements(elements) {
    // TODO: Implement highlighting for specific diagram elements
    // This would re-draw the diagram with certain elements emphasized
}

// ========================================================
// NAVIGATION & UI
// ========================================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goBackToProblems() {
    showScreen('selection-screen');
    appState.currentProblem = null;
    appState.currentStepIndex = -1;
}

// ========================================================
// EVENT LISTENERS
// ========================================================

function setupEventListeners() {
    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDifficulty(btn.dataset.difficulty);
        });
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', goBackToProblems);

    // Answer submission
    document.getElementById('submit-answer-btn').addEventListener('click', submitAnswer);

    // Allow Enter key to submit answer
    document.getElementById('student-answer-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });

    // Control buttons
    document.getElementById('next-step-btn').addEventListener('click', showNextStep);
    document.getElementById('prev-step-btn').addEventListener('click', showPreviousStep);
    document.getElementById('show-all-btn').addEventListener('click', showAllSteps);
    document.getElementById('show-answer-btn').addEventListener('click', revealAnswer);
    document.getElementById('reset-btn').addEventListener('click', resetSolution);
}

// ========================================================
// KEYBOARD NAVIGATION
// ========================================================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard shortcuts in solver screen
        const solverScreen = document.getElementById('solver-screen');
        if (!solverScreen.classList.contains('active')) return;

        switch(e.key) {
            case 'ArrowRight':
            case 'n':
            case 'N':
                if (!document.getElementById('next-step-btn').disabled) {
                    e.preventDefault();
                    showNextStep();
                }
                break;
            case 'ArrowLeft':
            case 'p':
            case 'P':
                if (!document.getElementById('prev-step-btn').disabled) {
                    e.preventDefault();
                    showPreviousStep();
                }
                break;
            case 'a':
            case 'A':
                e.preventDefault();
                revealAnswer();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                resetSolution();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                showAllSteps();
                break;
            case 'Escape':
                e.preventDefault();
                goBackToProblems();
                break;
        }
    });
}
