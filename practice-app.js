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
    stepsRevealed: []
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

        topicCard.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>
            <div class="topic-name">${topic.name}</div>
            <div class="topic-desc">${topic.description}</div>
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

    // Switch to solver screen
    showScreen('solver-screen');

    // Display problem information
    document.getElementById('problem-title').textContent = problem.title;
    document.getElementById('problem-statement').textContent = problem.problem;
    document.getElementById('visual-description').textContent = problem.visual.description;

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
