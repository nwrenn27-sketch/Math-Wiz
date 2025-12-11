// ========================================================
// MATH WIZ PROBLEM LIBRARY
// ========================================================
// Pre-loaded practice problems for students
// No AI required - all solutions are built-in
// Total: 180 problems (6 topics × 30 problems each)
// ========================================================

/**
 * Topic Metadata
 * Display information for each topic
 */
const TOPIC_INFO = {
    'related-rates': {
        name: 'Related Rates',
        icon: '📐',
        description: 'Moving objects, changing quantities',
        color: '#3b82f6'
    },
    'optimization': {
        name: 'Optimization',
        icon: '📈',
        description: 'Max/min problems, constraints',
        color: '#ef4444'
    },
    'integration': {
        name: 'Integration',
        icon: '∫',
        description: 'Area, volume, antiderivatives',
        color: '#10b981'
    },
    'derivatives': {
        name: 'Derivatives',
        icon: 'd/dx',
        description: 'Chain rule, product rule, quotients',
        color: '#8b5cf6'
    },
    'limits': {
        name: 'Limits',
        icon: 'lim',
        description: "Continuity, L'Hôpital's rule",
        color: '#f59e0b'
    },
    'series': {
        name: 'Series',
        icon: 'Σ',
        description: 'Convergence, Taylor series',
        color: '#ec4899'
    }
};

/**
 * Problem Library
 * Structure: organized by topic and difficulty
 * Each problem includes: prompt, visual, steps, answer
 */
const PROBLEM_LIBRARY = {
    'related-rates': {
        easy: [
            {
                id: 'rr-easy-1',
                title: 'Two Cars Moving Apart',
                problem: 'Two cars leave an intersection. One travels south at 60 m/hr and the other travels west at 25 m/hr. How fast is the distance between the cars increasing 2 hours later?',
                visual: {
                    type: 'two-cars',
                    description: 'Two cars moving perpendicular to each other forming a right triangle'
                },
                steps: [
                    {
                        title: "What do we know?",
                        body: "Okay, so picture this: two cars leave from the same spot at an intersection. One goes south at 60 m/hr (pretty fast!), and the other heads west at 25 m/hr (more of a Sunday driver). We want to know how fast the distance between them is growing after 2 hours.",
                        equation: "$$\\frac{dx}{dt} = 25 \\text{ m/hr (west)}, \\quad \\frac{dy}{dt} = 60 \\text{ m/hr (south)}, \\quad t = 2 \\text{ hours}$$",
                        concept: "The key insight: those speeds (60 and 25) are rates of change. They tell us how position changes over time. We're hunting for another rate - how the gap between them changes.",
                        mistake: "Don't mix up the speed (like 60 m/hr) with how far they've gone! Speed is the rate, distance is what changes because of that rate.",
                        highlightElements: []
                    },
                    {
                        title: "Visualize the triangle",
                        body: "Here's the cool part - imagine looking down from above. One car goes south, one goes west, so they're making a right angle! The distance between them is the diagonal of that right triangle. Remember good old Pythagoras from geometry?",
                        equation: "$$z^2 = x^2 + y^2$$",
                        concept: "This equation is always true for these three distances - not just at 2 hours, but at any moment in time. That's what makes it so powerful for this problem.",
                        mistake: "People sometimes think this only works at one specific time, but nope! This triangle relationship holds throughout their entire journey.",
                        highlightElements: ['x', 'y', 'z']
                    },
                    {
                        title: "Take the derivative (the magic step!)",
                        body: "Since everything's changing with time, we differentiate both sides. Think of it like this: if the sides of the triangle are growing, the diagonal must be growing too, right? The derivative tells us exactly how those rates relate.",
                        equation: "$$\\frac{d}{dt}(z^2) = \\frac{d}{dt}(x^2 + y^2)$$$$2z\\frac{dz}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt}$$",
                        concept: "This is called implicit differentiation - we're finding how rates connect when variables are linked by an equation. It's like seeing how pulling one string affects the whole web.",
                        mistake: "The chain rule trips people up here! When you differentiate $z^2$, you get $2z$ times $\\frac{dz}{dt}$, not just $2z$. That extra $\\frac{dz}{dt}$ is crucial!",
                        highlightElements: []
                    },
                    {
                        title: "Calculate where they are",
                        body: "Let's figure out where each car ended up after cruising for 2 hours. Distance = speed × time, so it's straightforward multiplication. Then we use Pythagoras again to find how far apart they are.",
                        equation: "$$x = (25)(2) = 50 \\text{ m}$$$$y = (60)(2) = 120 \\text{ m}$$$$z = \\sqrt{50^2 + 120^2} = \\sqrt{2500 + 14400} = \\sqrt{16900} = 130 \\text{ m}$$",
                        concept: "We need these actual distances to plug into our rate equation. Think of it like: 'Where are they now? And given where they are now, how fast is the gap growing?'",
                        mistake: "Watch your units! Everything needs to be in the same units - if you mix up meters and kilometers, you'll get nonsense.",
                        highlightElements: ['x', 'y', 'z']
                    },
                    {
                        title: "Solve for the answer",
                        body: "Now we've got all the pieces! Plug everything into that differentiated equation and solve for $\\frac{dz}{dt}$ - that's what we've been after this whole time. The algebra is pretty straightforward from here.",
                        equation: "$$2(130)\\frac{dz}{dt} = 2(50)(25) + 2(120)(60)$$$$260\\frac{dz}{dt} = 2500 + 14400$$$$260\\frac{dz}{dt} = 16900$$$$\\frac{dz}{dt} = \\frac{16900}{260} = 65 \\text{ m/hr}$$",
                        concept: "What this means: even though one car is going 60 and the other 25, the distance between them grows at 65 m/hr. Not 85 (the sum), but 65! That's because they're moving at right angles, not directly away from each other.",
                        mistake: "Don't forget to include units in your final answer! It's m/hr because we're finding a rate (how fast the distance changes).",
                        highlightElements: ['z']
                    }
                ],
                answer: "$\\frac{dz}{dt} = 65 \\text{ m/hr}$",
                colors: { x: '#3b82f6', y: '#8b5cf6', z: '#ef4444' }
            },
            {
                id: 'rr-easy-2',
                title: 'Plane and Radar Station',
                problem: 'A plane flies horizontally at an altitude of 1 mile and passes over a radar station. When the plane is 2 miles from the station, the radar detects that the distance from the plane to the station is increasing at 500 mph. What is the speed of the plane?',
                visual: {
                    type: 'plane-radar',
                    description: 'Plane flying horizontally forming a right triangle with radar station'
                },
                steps: [
                    {
                        title: "Identify Given Information",
                        body: "The altitude stays constant at 1 mile, the plane flies horizontally at 500 mph, and we want the rate when the distance to the station is 2 miles.",
                        equation: "$$h = 1 \\text{ mile (constant)}, \\quad \\frac{dx}{dt} = 500 \\text{ mph}, \\quad s = 2 \\text{ miles}$$",
                        concept: "Note that $\\frac{dh}{dt} = 0$ because altitude is constant.",
                        mistake: "Don't assume the plane is directly above the station at the moment we're analyzing.",
                        highlightElements: []
                    },
                    {
                        title: "Set Up the Pythagorean Relationship",
                        body: "The plane's horizontal distance from the point above the station ($x$), its altitude ($h$), and its straight-line distance to the station ($s$) form a right triangle.",
                        equation: "$$s^2 = x^2 + h^2$$",
                        concept: "Visualize the right triangle: $h$ is vertical (altitude), $x$ is horizontal, $s$ is the hypotenuse.",
                        mistake: "Don't confuse $s$ (distance to station) with $x$ (horizontal distance from overhead point).",
                        highlightElements: ['x', 'h', 's']
                    },
                    {
                        title: "Differentiate with Respect to Time",
                        body: "Apply implicit differentiation. Since $h$ is constant, $\\frac{dh}{dt} = 0$.",
                        equation: "$$2s\\frac{ds}{dt} = 2x\\frac{dx}{dt} + 2h\\frac{dh}{dt}$$$$2s\\frac{ds}{dt} = 2x\\frac{dx}{dt} + 0$$$$s\\frac{ds}{dt} = x\\frac{dx}{dt}$$",
                        concept: "When a variable is constant, its derivative is zero — this simplifies our equation.",
                        mistake: "Even though $h$ is constant, it still appears in the Pythagorean equation.",
                        highlightElements: []
                    },
                    {
                        title: "Find Horizontal Distance $x$",
                        body: "We know $s = 2$ and $h = 1$, so we can find $x$ using the Pythagorean theorem.",
                        equation: "$$2^2 = x^2 + 1^2$$$$4 = x^2 + 1$$$$x^2 = 3$$$$x = \\sqrt{3} \\text{ miles}$$",
                        concept: "We need $x$ to solve for $\\frac{ds}{dt}$.",
                        mistake: "We take the positive root since distance is always positive.",
                        highlightElements: ['x']
                    },
                    {
                        title: "Solve for $\\frac{ds}{dt}$",
                        body: "Substitute all known values into our equation.",
                        equation: "$$2(2)\\frac{ds}{dt} = 2(\\sqrt{3})(500)$$$$4\\frac{ds}{dt} = 1000\\sqrt{3}$$$$\\frac{ds}{dt} = 250\\sqrt{3} \\approx 433.01 \\text{ mph}$$",
                        concept: "The distance to the station is increasing at approximately 433 mph.",
                        mistake: "Leave answer in exact form ($250\\sqrt{3}$) unless asked to approximate.",
                        highlightElements: ['s']
                    }
                ],
                answer: "$\\frac{ds}{dt} = 250\\sqrt{3} \\approx 433 \\text{ mph}$",
                colors: { x: '#3b82f6', h: '#10b981', s: '#ef4444' }
            },
            {
                id: 'rr-easy-3',
                title: 'Expanding Balloon Diameter',
                problem: 'A spherical balloon is being inflated. If the diameter of the balloon is increasing at 10 cm/sec, how fast is the volume increasing when the diameter is 4 cm?',
                visual: {
                    type: 'balloon',
                    description: 'Spherical balloon showing diameter and radius'
                },
                steps: [
                    {
                        title: "Identify Given Information",
                        body: "The diameter increases at 10 cm/sec, and we want to find the volume rate when diameter is 4 cm.",
                        equation: "$$\\frac{dd}{dt} = 10 \\text{ cm/sec}, \\quad d = 4 \\text{ cm} \\quad (r = 2 \\text{ cm})$$",
                        concept: "Remember that radius $r = \\frac{d}{2}$, so when $d = 4$, $r = 2$.",
                        mistake: "Don't confuse diameter and radius when using volume formulas.",
                        highlightElements: []
                    },
                    {
                        title: "Express Volume in Terms of Diameter",
                        body: "The standard sphere volume formula uses radius, but we're given diameter. Let's convert: if $r = \\frac{d}{2}$, then:",
                        equation: "$$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\left(\\frac{d}{2}\\right)^3 = \\frac{4}{3}\\pi \\frac{d^3}{8} = \\frac{\\pi d^3}{6}$$",
                        concept: "This lets us work directly with diameter, which matches what we're given.",
                        mistake: "Be careful with the algebra when cubing $\\frac{d}{2}$. It's $\\frac{d^3}{8}$, not $\\frac{d^3}{2}$.",
                        highlightElements: ['d']
                    },
                    {
                        title: "Differentiate with Respect to Time",
                        body: "Now we differentiate both sides to relate the rates.",
                        equation: "$$\\frac{dV}{dt} = \\frac{\\pi}{6} \\cdot 3d^2 \\cdot \\frac{dd}{dt} = \\frac{\\pi d^2}{2} \\cdot \\frac{dd}{dt}$$",
                        concept: "The power rule gives us $3d^2$, and the chain rule adds $\\frac{dd}{dt}$.",
                        mistake: "Don't forget the chain rule! We're differentiating with respect to time, not diameter.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for Volume Rate",
                        body: "Plug in the values we know: $d = 4$ cm and $\\frac{dd}{dt} = 10$ cm/sec.",
                        equation: "$$\\frac{dV}{dt} = \\frac{\\pi (4)^2}{2} \\cdot 10 = \\frac{\\pi \\cdot 16}{2} \\cdot 10 = 8\\pi \\cdot 10 = 80\\pi \\text{ cm}^3\\text{/sec}$$",
                        concept: "The volume is increasing at $80\\pi \\approx 251.33$ cubic cm per second.",
                        mistake: "Don't forget to include $\\pi$ and the correct cubic units in your answer!",
                        highlightElements: ['d']
                    }
                ],
                answer: "$\\frac{dV}{dt} = 80\\pi \\approx 251.33 \\text{ cm}^3\\text{/sec}$",
                colors: { d: '#3b82f6', r: '#8b5cf6', V: '#ef4444' }
            },
            {
                id: 'rr-easy-4',
                title: 'Expanding Cube Edges',
                problem: 'The volume of a cube is increasing at 1200 cm³/min. How fast are the edges of the cube increasing when the edge length is 20 cm?',
                visual: {
                    type: 'cube',
                    description: 'Cube showing edge length and volume relationship'
                },
                steps: [
                    {
                        title: "Identify Given Information",
                        body: "The volume increases at 1200 cm³/min when the edge length is 20 cm. We need to find the rate of change of the edge length.",
                        equation: "$$\\frac{dV}{dt} = 1200 \\text{ cm}^3\\text{/min}, \\quad s = 20 \\text{ cm}$$",
                        concept: "We know the volume rate and want to find the edge length rate.",
                        mistake: "Don't confuse what you're given ($\\frac{dV}{dt}$) with what you're finding ($\\frac{ds}{dt}$).",
                        highlightElements: []
                    },
                    {
                        title: "Write the Volume Formula",
                        body: "For a cube with edge length $s$:",
                        equation: "$$V = s^3$$",
                        concept: "This is the fundamental relationship between volume and edge length for a cube.",
                        mistake: "Don't use the surface area formula by mistake!",
                        highlightElements: ['s']
                    },
                    {
                        title: "Differentiate with Respect to Time",
                        body: "Apply the power rule and chain rule.",
                        equation: "$$\\frac{dV}{dt} = 3s^2 \\cdot \\frac{ds}{dt}$$",
                        concept: "The power rule gives us $3s^2$, and the chain rule adds $\\frac{ds}{dt}$.",
                        mistake: "Remember to include $\\frac{ds}{dt}$ — we're differentiating with respect to time, not $s$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for $\\frac{ds}{dt}$",
                        body: "Rearrange and substitute the known values.",
                        equation: "$$\\frac{ds}{dt} = \\frac{1}{3s^2} \\cdot \\frac{dV}{dt} = \\frac{1200}{3(20)^2} = \\frac{1200}{3 \\cdot 400} = \\frac{1200}{1200} = 1 \\text{ cm/min}$$",
                        concept: "The edges are growing at 1 cm per minute when the volume is increasing at 1200 cm³/min.",
                        mistake: "Don't forget to square the edge length: $s^2 = 20^2 = 400$, not 20.",
                        highlightElements: ['s']
                    }
                ],
                answer: "$\\frac{ds}{dt} = 1 \\text{ cm/min}$",
                colors: { s: '#3b82f6', V: '#ef4444' }
            }
        ],
        medium: [
            // TODO: Add 10 medium related-rates problems
        ],
        hard: [
            // TODO: Add 10 hard related-rates problems
        ]
    },
    'optimization': {
        easy: [
            // TODO: Add 10 easy optimization problems
        ],
        medium: [
            // TODO: Add 10 medium optimization problems
        ],
        hard: [
            // TODO: Add 10 hard optimization problems
        ]
    },
    'integration': {
        easy: [
            // TODO: Add 10 easy integration problems
        ],
        medium: [
            // TODO: Add 10 medium integration problems
        ],
        hard: [
            // TODO: Add 10 hard integration problems
        ]
    },
    'derivatives': {
        easy: [
            // TODO: Add 10 easy derivatives problems
        ],
        medium: [
            // TODO: Add 10 medium derivatives problems
        ],
        hard: [
            // TODO: Add 10 hard derivatives problems
        ]
    },
    'limits': {
        easy: [
            // TODO: Add 10 easy limits problems
        ],
        medium: [
            // TODO: Add 10 medium limits problems
        ],
        hard: [
            // TODO: Add 10 hard limits problems
        ]
    },
    'series': {
        easy: [
            // TODO: Add 10 easy series problems
        ],
        medium: [
            // TODO: Add 10 medium series problems
        ],
        hard: [
            // TODO: Add 10 hard series problems
        ]
    }
};

/**
 * Get all problems for a specific topic and difficulty
 */
function getProblemsByTopicAndDifficulty(topic, difficulty) {
    return PROBLEM_LIBRARY[topic]?.[difficulty] || [];
}

/**
 * Get a specific problem by ID
 */
function getProblemById(problemId) {
    for (const topic in PROBLEM_LIBRARY) {
        for (const difficulty in PROBLEM_LIBRARY[topic]) {
            const problems = PROBLEM_LIBRARY[topic][difficulty];
            const found = problems.find(p => p.id === problemId);
            if (found) return found;
        }
    }
    return null;
}

/**
 * Get all available topics
 */
function getAvailableTopics() {
    return Object.keys(PROBLEM_LIBRARY);
}
