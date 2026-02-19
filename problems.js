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
        icon: 'dy/dt',
        description: 'Moving objects, changing quantities',
        color: '#3b82f6'
    },
    'optimization': {
        name: 'Optimization',
        icon: 'max',
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
    },
    'critical-points': {
        name: 'Critical Points',
        icon: 'f\'=0',
        description: 'Finding and classifying critical points',
        color: '#06b6d4'
    },
    'inflection-points': {
        name: 'Inflection Points',
        icon: 'f\'\'=0',
        description: 'Concavity and inflection points',
        color: '#84cc16'
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
            {
                id: 'rr-med-1',
                title: 'Expanding Circle',
                problem: "A circle's radius is increasing at a rate of 3 cm/s. Find the rate at which the area is increasing when the radius is 10 cm.",
                visual: {
                    type: 'balloon',
                    description: 'A circle whose radius r grows over time'
                },
                steps: [
                    {
                        title: 'Write the area formula',
                        body: 'The area of a circle is A = πr². Both A and r are functions of time t.',
                        equation: '$A = \\pi r^2$',
                        concept: 'Whenever a geometric quantity changes over time, write its formula first — then differentiate.'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Use the chain rule: dA/dt = 2πr · (dr/dt).',
                        equation: '$\\dfrac{dA}{dt} = 2\\pi r \\cdot \\dfrac{dr}{dt}$',
                        mistake: 'Don\'t forget the chain rule — dr/dt multiplies the result, it doesn\'t just disappear.'
                    },
                    {
                        title: 'Plug in known values',
                        body: 'We know dr/dt = 3 cm/s and r = 10 cm. Substitute.',
                        equation: '$\\dfrac{dA}{dt} = 2\\pi (10)(3) = 60\\pi \\approx 188.5 \\text{ cm}^2/\\text{s}$'
                    }
                ],
                answer: '$\\dfrac{dA}{dt} = 60\\pi \\approx 188.5$ cm²/s',
                colors: { d: '#3b82f6' }
            },
            {
                id: 'rr-med-2',
                title: 'Rising Water in a Cone',
                problem: 'Water is being poured into a cone-shaped cup at 5 cm³/s. The cup has height 12 cm and radius 4 cm. How fast is the water level rising when the water is 6 cm deep?',
                visual: {
                    type: 'function-graph',
                    function: 'Math.PI * (x/3)**2 * x',
                    xRange: [0, 12],
                    yRange: [0, 70],
                    description: 'Volume of water V as a function of water depth h'
                },
                steps: [
                    {
                        title: 'Set up similar triangles',
                        body: 'The cone has height 12 and radius 4, so r/h = 4/12 = 1/3, meaning r = h/3 at any water level h.',
                        equation: '$\\dfrac{r}{h} = \\dfrac{4}{12} \\Rightarrow r = \\dfrac{h}{3}$',
                        concept: 'Similar triangles let us eliminate one variable — express r in terms of h so V depends on h alone.'
                    },
                    {
                        title: 'Write volume in terms of h only',
                        body: 'Volume of a cone is V = (1/3)πr²h. Substitute r = h/3.',
                        equation: '$V = \\dfrac{1}{3}\\pi\\left(\\dfrac{h}{3}\\right)^2 h = \\dfrac{\\pi h^3}{27}$'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Apply the chain rule to both sides.',
                        equation: '$\\dfrac{dV}{dt} = \\dfrac{\\pi h^2}{9} \\cdot \\dfrac{dh}{dt}$'
                    },
                    {
                        title: 'Solve for dh/dt',
                        body: 'Plug in dV/dt = 5 cm³/s and h = 6 cm.',
                        equation: '$5 = \\dfrac{\\pi (36)}{9} \\cdot \\dfrac{dh}{dt} = 4\\pi \\cdot \\dfrac{dh}{dt} \\Rightarrow \\dfrac{dh}{dt} = \\dfrac{5}{4\\pi} \\approx 0.398 \\text{ cm/s}$'
                    }
                ],
                answer: '$\\dfrac{dh}{dt} = \\dfrac{5}{4\\pi} \\approx 0.398$ cm/s',
                colors: {}
            },
            {
                id: 'rr-med-3',
                title: 'Ladder Sliding Down a Wall',
                problem: 'A 13 ft ladder leans against a wall. The bottom slides away from the wall at 2 ft/s. How fast is the top sliding down when the bottom is 5 ft from the wall?',
                visual: {
                    type: 'two-cars',
                    description: 'Right triangle formed by ladder, wall, and ground'
                },
                steps: [
                    {
                        title: 'Set up the Pythagorean relationship',
                        body: 'Let x = distance of bottom from wall, y = height of top on wall. The ladder length is always 13 ft.',
                        equation: '$x^2 + y^2 = 13^2 = 169$',
                        concept: 'The ladder length is constant — that\'s your constraint equation.'
                    },
                    {
                        title: 'Differentiate implicitly',
                        body: 'Both x and y change with time. Differentiate both sides.',
                        equation: '$2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0$'
                    },
                    {
                        title: 'Find y when x = 5',
                        body: 'Use the Pythagorean theorem: y = √(169 − 25) = √144 = 12 ft.',
                        equation: '$y = \\sqrt{169 - 25} = 12 \\text{ ft}$'
                    },
                    {
                        title: 'Solve for dy/dt',
                        body: 'Substitute x = 5, y = 12, dx/dt = 2.',
                        equation: '$2(5)(2) + 2(12)\\dfrac{dy}{dt} = 0 \\Rightarrow \\dfrac{dy}{dt} = -\\dfrac{10}{12} = -\\dfrac{5}{6} \\text{ ft/s}$',
                        concept: 'The negative sign means the top is sliding DOWN — that\'s expected and correct.'
                    }
                ],
                answer: '$\\dfrac{dy}{dt} = -\\dfrac{5}{6} \\approx -0.833$ ft/s (sliding down)',
                colors: { x: '#3b82f6', y: '#8b5cf6', z: '#ef4444' }
            },
            {
                id: 'rr-med-4',
                title: 'Balloon Inflation',
                problem: 'A spherical balloon is being inflated so that its volume increases at 20 cm³/s. How fast is the radius increasing when the radius is 5 cm?',
                visual: {
                    type: 'balloon',
                    description: 'Spherical balloon with increasing radius r'
                },
                steps: [
                    {
                        title: 'Write the volume formula for a sphere',
                        body: 'V = (4/3)πr³. Both V and r are functions of time.',
                        equation: '$V = \\dfrac{4}{3}\\pi r^3$'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Apply the chain rule.',
                        equation: '$\\dfrac{dV}{dt} = 4\\pi r^2 \\cdot \\dfrac{dr}{dt}$',
                        concept: 'The derivative of r³ is 3r², and the chain rule adds the dr/dt factor.'
                    },
                    {
                        title: 'Solve for dr/dt',
                        body: 'Plug in dV/dt = 20 and r = 5.',
                        equation: '$20 = 4\\pi(25)\\dfrac{dr}{dt} \\Rightarrow \\dfrac{dr}{dt} = \\dfrac{20}{100\\pi} = \\dfrac{1}{5\\pi} \\approx 0.0637 \\text{ cm/s}$'
                    }
                ],
                answer: '$\\dfrac{dr}{dt} = \\dfrac{1}{5\\pi} \\approx 0.0637$ cm/s',
                colors: { d: '#8b5cf6' }
            }
        ],
        hard: [
            {
                id: 'rr-hard-1',
                title: 'Shadow Problem',
                problem: 'A 6 ft tall person walks away from a streetlamp that is 15 ft tall at a rate of 4 ft/s. How fast is the length of the person\'s shadow increasing when they are 10 ft from the lamp?',
                visual: {
                    type: 'function-graph',
                    function: '(6/9)*x',
                    xRange: [0, 20],
                    yRange: [0, 16],
                    description: 'Shadow length s as a function of distance x from the lamp'
                },
                steps: [
                    {
                        title: 'Set up similar triangles',
                        body: 'Let x = distance from lamp to person, s = shadow length. The lamp (15 ft) and the person (6 ft) form two similar triangles with the ground.',
                        equation: '$\\dfrac{15}{x + s} = \\dfrac{6}{s}$',
                        concept: 'The tip of the shadow, the top of the person, and the top of the lamp are collinear — that\'s what creates similar triangles.'
                    },
                    {
                        title: 'Solve for s in terms of x',
                        body: 'Cross-multiply and simplify.',
                        equation: '$15s = 6(x + s) \\Rightarrow 9s = 6x \\Rightarrow s = \\dfrac{2x}{3}$'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Since s = (2/3)x, differentiate both sides.',
                        equation: '$\\dfrac{ds}{dt} = \\dfrac{2}{3}\\dfrac{dx}{dt}$'
                    },
                    {
                        title: 'Plug in dx/dt = 4',
                        body: 'The person\'s speed dx/dt = 4 ft/s — and notice this answer is independent of their position.',
                        equation: '$\\dfrac{ds}{dt} = \\dfrac{2}{3}(4) = \\dfrac{8}{3} \\approx 2.67 \\text{ ft/s}$',
                        concept: 'The shadow grows at the same rate regardless of how far the person is from the lamp — a surprising result!'
                    }
                ],
                answer: '$\\dfrac{ds}{dt} = \\dfrac{8}{3} \\approx 2.67$ ft/s',
                colors: {}
            },
            {
                id: 'rr-hard-2',
                title: 'Two Cars Approaching an Intersection',
                problem: 'Car A travels east at 50 mph and Car B travels north at 60 mph, both approaching the same intersection. How fast is the distance between them changing when Car A is 0.3 miles and Car B is 0.4 miles from the intersection?',
                visual: {
                    type: 'two-cars',
                    description: 'Two cars approaching an intersection — right triangle with shrinking legs'
                },
                steps: [
                    {
                        title: 'Define variables and the constraint',
                        body: 'Let a = Car A\'s distance from intersection, b = Car B\'s distance. Distance between them: z² = a² + b².',
                        equation: '$z^2 = a^2 + b^2$',
                        concept: 'Since both cars are approaching, da/dt = −50 and db/dt = −60 (negative = decreasing distance).'
                    },
                    {
                        title: 'Differentiate implicitly',
                        body: 'Differentiate z² = a² + b² with respect to t.',
                        equation: '$2z\\dfrac{dz}{dt} = 2a\\dfrac{da}{dt} + 2b\\dfrac{db}{dt}$'
                    },
                    {
                        title: 'Find z at the given moment',
                        body: 'With a = 0.3 and b = 0.4: z = √(0.09 + 0.16) = √0.25 = 0.5 miles.',
                        equation: '$z = \\sqrt{(0.3)^2 + (0.4)^2} = 0.5 \\text{ miles}$'
                    },
                    {
                        title: 'Solve for dz/dt',
                        body: 'Substitute all values.',
                        equation: '$2(0.5)\\dfrac{dz}{dt} = 2(0.3)(-50) + 2(0.4)(-60) = -30 - 48 = -78$',
                        mistake: 'Don\'t forget the negative signs — the cars are approaching, so their distances are decreasing.'
                    },
                    {
                        title: 'Final answer',
                        body: 'Divide both sides by 1.',
                        equation: '$\\dfrac{dz}{dt} = \\dfrac{-78}{1} = -78 \\text{ mph}$',
                        concept: 'Negative means the distance is decreasing — the cars are getting closer together at 78 mph.'
                    }
                ],
                answer: '$\\dfrac{dz}{dt} = -78$ mph (distance decreasing at 78 mph)',
                colors: { x: '#3b82f6', y: '#8b5cf6', z: '#ef4444' }
            },
            {
                id: 'rr-hard-3',
                title: 'Rotating Spotlight',
                problem: 'A spotlight is located 300 m from a straight wall. The light rotates at 0.05 rad/s. How fast is the light spot moving along the wall when the beam makes an angle of π/6 with the perpendicular?',
                visual: {
                    type: 'function-graph',
                    function: '300 * Math.tan(x)',
                    xRange: [0, 1.2],
                    yRange: [0, 600],
                    description: 'Position of light spot x = 300·tan(θ) as a function of angle θ'
                },
                steps: [
                    {
                        title: 'Write the trig relationship',
                        body: 'Let x = position of the light spot on the wall, θ = angle from the perpendicular. Then x = 300·tan(θ).',
                        equation: '$x = 300\\tan(\\theta)$',
                        concept: 'SOH-CAH-TOA: tan(θ) = opposite/adjacent = x/300.'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Use the chain rule — d/dθ(tan θ) = sec²θ.',
                        equation: '$\\dfrac{dx}{dt} = 300\\sec^2(\\theta) \\cdot \\dfrac{d\\theta}{dt}$'
                    },
                    {
                        title: 'Evaluate at θ = π/6',
                        body: 'sec(π/6) = 1/cos(π/6) = 1/(√3/2) = 2/√3. So sec²(π/6) = 4/3.',
                        equation: '$\\sec^2\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{4}{3}$'
                    },
                    {
                        title: 'Calculate the speed',
                        body: 'Substitute dθ/dt = 0.05 and sec²(π/6) = 4/3.',
                        equation: '$\\dfrac{dx}{dt} = 300 \\cdot \\dfrac{4}{3} \\cdot 0.05 = 20 \\text{ m/s}$'
                    }
                ],
                answer: '$\\dfrac{dx}{dt} = 20$ m/s',
                colors: {}
            },
            {
                id: 'rr-hard-4',
                title: 'Oil Spill Expanding',
                problem: 'An oil spill forms a circular patch whose radius increases at 2 m/s, but the thickness decreases so that the total volume stays constant at 5000 m³. Find the rate of change of the thickness when the radius is 20 m.',
                visual: {
                    type: 'function-graph',
                    function: '5000 / (Math.PI * x**2)',
                    xRange: [5, 40],
                    yRange: [0, 20],
                    description: 'Thickness h = V/(πr²) as a function of radius r'
                },
                steps: [
                    {
                        title: 'Write the volume formula',
                        body: 'Model the spill as a cylinder: V = πr²h. Volume is constant at 5000 m³.',
                        equation: '$V = \\pi r^2 h = 5000$ (constant)',
                        concept: 'Since V is constant, dV/dt = 0. This is the key constraint.'
                    },
                    {
                        title: 'Differentiate with respect to time',
                        body: 'Differentiate V = πr²h using the product rule on r²h.',
                        equation: '$\\dfrac{dV}{dt} = \\pi\\left(2r\\dfrac{dr}{dt}\\cdot h + r^2\\dfrac{dh}{dt}\\right) = 0$'
                    },
                    {
                        title: 'Find h when r = 20',
                        body: 'From V = πr²h: h = 5000/(π·400) = 25/(2π).',
                        equation: '$h = \\dfrac{5000}{\\pi(20)^2} = \\dfrac{25}{2\\pi}$'
                    },
                    {
                        title: 'Solve for dh/dt',
                        body: 'Substitute r = 20, dr/dt = 2, h = 25/(2π) into the differentiated equation.',
                        equation: '$0 = \\pi\\left(2(20)(2)\\cdot\\dfrac{25}{2\\pi} + (400)\\dfrac{dh}{dt}\\right)$',
                        mistake: 'Keep the π — it cancels cleanly in the final step.'
                    },
                    {
                        title: 'Final answer',
                        body: 'Solve for dh/dt.',
                        equation: '$0 = 1000 + 400\\pi\\dfrac{dh}{dt} \\Rightarrow \\dfrac{dh}{dt} = -\\dfrac{1000}{400\\pi} = -\\dfrac{5}{2\\pi} \\approx -0.796 \\text{ m/s}$',
                        concept: 'Negative confirms the thickness is decreasing as the spill spreads out — makes physical sense!'
                    }
                ],
                answer: '$\\dfrac{dh}{dt} = -\\dfrac{5}{2\\pi} \\approx -0.796$ m/s',
                colors: {}
            }
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
            {
                id: 'lim-easy-1',
                title: 'Linear Function Limit',
                problem: 'Evaluate $\\lim_{x \\to 3} (2x + 5)$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of linear function approaching x=3',
                    function: '2*x + 5',
                    xRange: [0, 6],
                    yRange: [0, 20],
                    limitPoint: {x: 3, y: 11, approaching: 3}
                },
                steps: [
                    {
                        title: "Check if we can use direct substitution",
                        body: "For polynomial functions (and this is just a linear function), we can simply plug in the value directly.",
                        equation: "$$f(x) = 2x + 5$$",
                        concept: "Linear and polynomial functions are continuous everywhere, so limits can be found by direct substitution.",
                        mistake: "Don't overthink simple problems. If the function is continuous at the point, just substitute!",
                        highlightElements: []
                    },
                    {
                        title: "Substitute x = 3",
                        body: "Plug in $x = 3$ directly into the expression.",
                        equation: "$$\\lim_{x \\to 3} (2x + 5) = 2(3) + 5 = 6 + 5 = 11$$",
                        concept: "Direct substitution works because the function is defined and continuous at $x = 3$.",
                        mistake: "Make sure to multiply before adding: $2(3) = 6$, then $6 + 5 = 11$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 3} (2x + 5) = 11$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-easy-2',
                title: 'Quadratic Function Limit',
                problem: 'Evaluate $\\lim_{x \\to -2} (x^2 + 4x + 1)$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of parabola approaching x=-2',
                    function: 'x*x + 4*x + 1',
                    xRange: [-5, 2],
                    yRange: [-4, 8],
                    limitPoint: {x: -2, y: -3, approaching: -2}
                },
                steps: [
                    {
                        title: "Identify the function type",
                        body: "This is a polynomial (quadratic) function, which is continuous everywhere.",
                        equation: "$$f(x) = x^2 + 4x + 1$$",
                        concept: "Polynomials are continuous for all real numbers, so we can use direct substitution.",
                        mistake: "Don't try to factor or simplify when direct substitution works!",
                        highlightElements: []
                    },
                    {
                        title: "Substitute x = -2",
                        body: "Evaluate the function at $x = -2$.",
                        equation: "$$\\lim_{x \\to -2} (x^2 + 4x + 1) = (-2)^2 + 4(-2) + 1$$$$= 4 - 8 + 1 = -3$$",
                        concept: "Be careful with negative numbers: $(-2)^2 = 4$ (positive) and $4(-2) = -8$ (negative).",
                        mistake: "Common error: $(-2)^2 = 4$, NOT $-4$. The square makes it positive.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to -2} (x^2 + 4x + 1) = -3$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-easy-3',
                title: 'Sine Function Limit',
                problem: 'Evaluate $\\lim_{x \\to 0} \\sin(x)$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of sine function approaching x=0',
                    function: 'Math.sin(x)',
                    xRange: [-3, 3],
                    yRange: [-1.5, 1.5],
                    limitPoint: {x: 0, y: 0, approaching: 0}
                },
                steps: [
                    {
                        title: "Recognize continuity of sine",
                        body: "The sine function is continuous everywhere on the real number line.",
                        equation: "$$f(x) = \\sin(x)$$",
                        concept: "Trigonometric functions like sine, cosine, and tangent (where defined) are continuous, allowing direct substitution.",
                        mistake: "Make sure your calculator is in radian mode when working with calculus limits!",
                        highlightElements: []
                    },
                    {
                        title: "Substitute x = 0",
                        body: "Evaluate sine at zero.",
                        equation: "$$\\lim_{x \\to 0} \\sin(x) = \\sin(0) = 0$$",
                        concept: "From the unit circle, $\\sin(0) = 0$. This is a fundamental trigonometric value.",
                        mistake: "Don't confuse this with the important limit $\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\sin(x) = 0$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-easy-4',
                title: 'Removable Discontinuity',
                problem: 'Evaluate $\\lim_{x \\to 5} \\frac{x^2 - 25}{x - 5}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph with hole at x=5, but limit exists',
                    function: 'x !== 5 ? (x*x - 25)/(x - 5) : NaN',
                    xRange: [2, 8],
                    yRange: [0, 15],
                    limitPoint: {x: 5, y: 10, approaching: 5, isHole: true}
                },
                steps: [
                    {
                        title: "Check direct substitution",
                        body: "If we plug in $x = 5$ directly, we get $\\frac{0}{0}$, which is indeterminate.",
                        equation: "$$\\frac{5^2 - 25}{5 - 5} = \\frac{0}{0} \\quad \\text{(indeterminate)}$$",
                        concept: "The form $\\frac{0}{0}$ means we need to simplify first. This often means factoring.",
                        mistake: "NEVER write $\\frac{0}{0} = 0$ or $\\frac{0}{0} = 1$. It's undefined and requires further work!",
                        highlightElements: []
                    },
                    {
                        title: "Factor the numerator",
                        body: "The numerator is a difference of squares: $a^2 - b^2 = (a-b)(a+b)$.",
                        equation: "$$x^2 - 25 = x^2 - 5^2 = (x-5)(x+5)$$",
                        concept: "Difference of squares is a key factoring pattern you should recognize instantly.",
                        mistake: "Don't forget: $x^2 - 25 = (x-5)(x+5)$, NOT $(x-5)^2$.",
                        highlightElements: []
                    },
                    {
                        title: "Cancel common factors",
                        body: "Cancel the $(x-5)$ factor from numerator and denominator.",
                        equation: "$$\\frac{x^2 - 25}{x - 5} = \\frac{(x-5)(x+5)}{x-5} = x + 5 \\quad (x \\neq 5)$$",
                        concept: "We can cancel because we're taking a limit as $x$ approaches 5, not evaluating AT $x = 5$.",
                        mistake: "Remember to note $x \\neq 5$ since we cancelled. The simplified form is only valid for $x \\neq 5$.",
                        highlightElements: []
                    },
                    {
                        title: "Evaluate the limit",
                        body: "Now substitute $x = 5$ into the simplified expression.",
                        equation: "$$\\lim_{x \\to 5} (x + 5) = 5 + 5 = 10$$",
                        concept: "After simplification, the limit exists even though the original function has a hole at $x = 5$.",
                        mistake: "The limit is 10, but note that $f(5)$ is undefined. The limit and function value are different!",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 5} \\frac{x^2 - 25}{x - 5} = 10$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            }
        ],
        medium: [
            {
                id: 'lim-med-1',
                title: 'Factoring Technique',
                problem: 'Evaluate $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$',
                visual: {
                    type: 'function-graph',
                    description: 'Rational function with removable discontinuity at x=2',
                    function: 'x !== 2 ? (x*x - 4)/(x - 2) : NaN',
                    xRange: [-1, 5],
                    yRange: [-2, 8],
                    limitPoint: {x: 2, y: 4, approaching: 2, isHole: true}
                },
                steps: [
                    {
                        title: "Direct substitution gives indeterminate form",
                        body: "Substituting $x = 2$ gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{2^2 - 4}{2 - 2} = \\frac{0}{0}$$",
                        concept: "The $\\frac{0}{0}$ form tells us to factor and simplify.",
                        mistake: "Don't give up when you see $\\frac{0}{0}$. It means there's likely a common factor to cancel.",
                        highlightElements: []
                    },
                    {
                        title: "Factor difference of squares",
                        body: "Factor the numerator.",
                        equation: "$$x^2 - 4 = (x-2)(x+2)$$$$\\frac{x^2-4}{x-2} = \\frac{(x-2)(x+2)}{x-2}$$",
                        concept: "Pattern: $a^2 - b^2 = (a-b)(a+b)$",
                        mistake: "Check your factoring: $(x-2)(x+2) = x^2 - 4$, correct!",
                        highlightElements: []
                    },
                    {
                        title: "Cancel and evaluate",
                        body: "Cancel common factor and substitute.",
                        equation: "$$\\frac{(x-2)(x+2)}{x-2} = x+2 \\quad (x \\neq 2)$$$$\\lim_{x \\to 2} (x+2) = 2 + 2 = 4$$",
                        concept: "After canceling, the limit equals the simplified expression evaluated at $x=2$.",
                        mistake: "The original function is undefined at $x=2$, but the limit still exists!",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-med-2',
                title: 'Special Trig Limit',
                problem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of sin(3x)/x approaching x=0',
                    function: 'x !== 0 ? Math.sin(3*x)/x : NaN',
                    xRange: [-2, 2],
                    yRange: [-1, 4],
                    limitPoint: {x: 0, y: 3, approaching: 0, isHole: true}
                },
                steps: [
                    {
                        title: "Recognize the special limit form",
                        body: "This resembles $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$, a fundamental limit.",
                        equation: "$$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$$",
                        concept: "The key limit: $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$ is one you should memorize!",
                        mistake: "Don't try to use L'Hôpital's rule yet - use the special trig limit instead.",
                        highlightElements: []
                    },
                    {
                        title: "Manipulate to match the standard form",
                        body: "Multiply and divide by 3 to create $\\frac{\\sin(3x)}{3x}$.",
                        equation: "$$\\frac{\\sin(3x)}{x} = 3 \\cdot \\frac{\\sin(3x)}{3x}$$",
                        concept: "We want the denominator to match what's inside the sine function.",
                        mistake: "Make sure you multiply by 3 on the outside to compensate: $\\frac{1}{x} = \\frac{3}{3x}$.",
                        highlightElements: []
                    },
                    {
                        title: "Apply the special limit",
                        body: "As $x \\to 0$, we also have $3x \\to 0$. Use substitution $u = 3x$.",
                        equation: "$$\\lim_{x \\to 0} 3 \\cdot \\frac{\\sin(3x)}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 3 \\cdot 1 = 3$$",
                        concept: "The limit $\\frac{\\sin(u)}{u} \\to 1$ as $u \\to 0$ regardless of what $u$ is in terms of $x$.",
                        mistake: "Don't forget the factor of 3 out front!",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-med-3',
                title: 'Rationalizing Technique',
                problem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x+9} - 3}{x}$',
                visual: {
                    type: 'function-graph',
                    description: 'Square root function difference quotient',
                    function: 'x !== 0 ? (Math.sqrt(x+9) - 3)/x : NaN',
                    xRange: [-2, 2],
                    yRange: [0, 0.3],
                    limitPoint: {x: 0, y: 1/6, approaching: 0, isHole: true}
                },
                steps: [
                    {
                        title: "Check for indeterminate form",
                        body: "Direct substitution gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{\\sqrt{0+9} - 3}{0} = \\frac{3 - 3}{0} = \\frac{0}{0}$$",
                        concept: "When we have square roots, rationalization is often the key technique.",
                        mistake: "Don't try to factor here - there's a square root involved!",
                        highlightElements: []
                    },
                    {
                        title: "Multiply by conjugate",
                        body: "Multiply numerator and denominator by the conjugate $\\sqrt{x+9} + 3$.",
                        equation: "$$\\frac{\\sqrt{x+9} - 3}{x} \\cdot \\frac{\\sqrt{x+9} + 3}{\\sqrt{x+9} + 3}$$",
                        concept: "The conjugate of $a - b$ is $a + b$. Multiplying eliminates the square root.",
                        mistake: "Make sure to multiply BOTH numerator and denominator by the conjugate!",
                        highlightElements: []
                    },
                    {
                        title: "Simplify using difference of squares",
                        body: "Use $(a-b)(a+b) = a^2 - b^2$ in the numerator.",
                        equation: "$$= \\frac{(\\sqrt{x+9})^2 - 3^2}{x(\\sqrt{x+9} + 3)} = \\frac{x+9-9}{x(\\sqrt{x+9}+3)} = \\frac{x}{x(\\sqrt{x+9}+3)}$$",
                        concept: "The $(\\sqrt{x+9})^2 = x+9$ and $3^2 = 9$ simplify nicely!",
                        mistake: "Don't forget to square both terms: $(\\sqrt{x+9})^2 = x+9$, NOT $x+3$.",
                        highlightElements: []
                    },
                    {
                        title: "Cancel and evaluate",
                        body: "Cancel $x$ and substitute $x = 0$.",
                        equation: "$$\\frac{x}{x(\\sqrt{x+9}+3)} = \\frac{1}{\\sqrt{x+9}+3}$$$$\\lim_{x \\to 0} \\frac{1}{\\sqrt{x+9}+3} = \\frac{1}{\\sqrt{9}+3} = \\frac{1}{3+3} = \\frac{1}{6}$$",
                        concept: "After rationalization and cancellation, direct substitution works!",
                        mistake: "Make sure to evaluate the square root: $\\sqrt{9} = 3$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\frac{\\sqrt{x+9} - 3}{x} = \\frac{1}{6}$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-med-4',
                title: 'Cubic Factoring',
                problem: 'Evaluate $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}$',
                visual: {
                    type: 'function-graph',
                    description: 'Cubic function with hole at x=1',
                    function: 'x !== 1 ? (x*x*x - 1)/(x - 1) : NaN',
                    xRange: [-1, 3],
                    yRange: [-2, 8],
                    limitPoint: {x: 1, y: 3, approaching: 1, isHole: true}
                },
                steps: [
                    {
                        title: "Identify indeterminate form",
                        body: "Direct substitution gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{1^3 - 1}{1 - 1} = \\frac{0}{0}$$",
                        concept: "We need to factor the cubic $x^3 - 1$.",
                        mistake: "Don't confuse $x^3 - 1$ with $(x-1)^3$. They're very different!",
                        highlightElements: []
                    },
                    {
                        title: "Factor using difference of cubes",
                        body: "Use the formula $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$.",
                        equation: "$$x^3 - 1 = x^3 - 1^3 = (x-1)(x^2 + x + 1)$$",
                        concept: "Difference of cubes formula: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$. Memorize it!",
                        mistake: "The middle term in the quadratic is $+x$ (which is $ab$ where $a=x, b=1$).",
                        highlightElements: []
                    },
                    {
                        title: "Cancel and evaluate",
                        body: "Cancel the common factor $(x-1)$.",
                        equation: "$$\\frac{x^3-1}{x-1} = \\frac{(x-1)(x^2+x+1)}{x-1} = x^2 + x + 1$$$$\\lim_{x \\to 1} (x^2+x+1) = 1 + 1 + 1 = 3$$",
                        concept: "After factoring and canceling, we get a polynomial we can evaluate directly.",
                        mistake: "Don't forget to add all three terms: $1^2 + 1 + 1 = 3$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = 3$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            }
        ],
        hard: [
            {
                id: 'lim-hard-1',
                title: 'Trigonometric Limit (L\'Hôpital\'s Rule)',
                problem: 'Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of (1-cos(x))/x^2 approaching x=0',
                    function: 'x !== 0 ? (1 - Math.cos(x))/(x*x) : NaN',
                    xRange: [-2, 2],
                    yRange: [-0.2, 0.7],
                    limitPoint: {x: 0, y: 0.5, approaching: 0, isHole: true}
                },
                steps: [
                    {
                        title: "Check for indeterminate form",
                        body: "Substituting $x = 0$ gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{1 - \\cos(0)}{0^2} = \\frac{1-1}{0} = \\frac{0}{0}$$",
                        concept: "This is a perfect candidate for L'Hôpital's Rule or trig identities.",
                        mistake: "Remember: $\\cos(0) = 1$, so the numerator is indeed 0.",
                        highlightElements: []
                    },
                    {
                        title: "Apply L'Hôpital's Rule",
                        body: "Take the derivative of numerator and denominator separately.",
                        equation: "$$\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\lim_{x \\to 0} \\frac{\\frac{d}{dx}[1-\\cos(x)]}{\\frac{d}{dx}[x^2]}$$$$= \\lim_{x \\to 0} \\frac{\\sin(x)}{2x}$$",
                        concept: "L'Hôpital's Rule: if $\\frac{f(x)}{g(x)} \\to \\frac{0}{0}$, then $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$ (if it exists).",
                        mistake: "Derivative of $-\\cos(x)$ is $+\\sin(x)$. Watch the sign!",
                        highlightElements: []
                    },
                    {
                        title: "Still indeterminate, apply again",
                        body: "We still have $\\frac{0}{0}$, so apply L'Hôpital's again.",
                        equation: "$$\\lim_{x \\to 0} \\frac{\\sin(x)}{2x} = \\lim_{x \\to 0} \\frac{\\cos(x)}{2}$$",
                        concept: "Sometimes you need to apply L'Hôpital's Rule multiple times.",
                        mistake: "Alternatively, you could use $\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$ to get $\\frac{1}{2} \\cdot 1 = \\frac{1}{2}$.",
                        highlightElements: []
                    },
                    {
                        title: "Evaluate the limit",
                        body: "Now we can substitute $x = 0$ directly.",
                        equation: "$$\\lim_{x \\to 0} \\frac{\\cos(x)}{2} = \\frac{\\cos(0)}{2} = \\frac{1}{2}$$",
                        concept: "After applying L'Hôpital's Rule (possibly multiple times), we eventually get a determinate form.",
                        mistake: "Don't forget: $\\cos(0) = 1$, so the answer is $\\frac{1}{2}$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-hard-2',
                title: 'Limit at Infinity',
                problem: 'Evaluate $\\lim_{x \\to \\infty} \\frac{5x^2 - 3x + 1}{2x^2 + x - 4}$',
                visual: {
                    type: 'function-graph',
                    description: 'Rational function approaching horizontal asymptote',
                    function: '(5*x*x - 3*x + 1)/(2*x*x + x - 4)',
                    xRange: [-10, 10],
                    yRange: [0, 4],
                    limitPoint: {x: 10, y: 2.5, approaching: 'infinity', horizontalAsymptote: 2.5}
                },
                steps: [
                    {
                        title: "Identify the form",
                        body: "As $x \\to \\infty$, both numerator and denominator approach infinity: $\\frac{\\infty}{\\infty}$ form.",
                        equation: "$$\\lim_{x \\to \\infty} \\frac{5x^2 - 3x + 1}{2x^2 + x - 4}$$",
                        concept: "For rational functions at infinity, compare the degrees of numerator and denominator.",
                        mistake: "Don't try to substitute $\\infty$ directly. Use algebraic techniques instead.",
                        highlightElements: []
                    },
                    {
                        title: "Divide by highest power of x",
                        body: "Divide every term by $x^2$ (the highest power in the denominator).",
                        equation: "$$\\frac{5x^2 - 3x + 1}{2x^2 + x - 4} = \\frac{\\frac{5x^2}{x^2} - \\frac{3x}{x^2} + \\frac{1}{x^2}}{\\frac{2x^2}{x^2} + \\frac{x}{x^2} - \\frac{4}{x^2}}$$$$= \\frac{5 - \\frac{3}{x} + \\frac{1}{x^2}}{2 + \\frac{1}{x} - \\frac{4}{x^2}}$$",
                        concept: "Dividing by the highest power simplifies the expression and reveals the limiting behavior.",
                        mistake: "Make sure to divide EVERY term, including constants, by $x^2$.",
                        highlightElements: []
                    },
                    {
                        title: "Evaluate as x approaches infinity",
                        body: "As $x \\to \\infty$, terms like $\\frac{1}{x}$ and $\\frac{1}{x^2}$ approach 0.",
                        equation: "$$\\lim_{x \\to \\infty} \\frac{5 - \\frac{3}{x} + \\frac{1}{x^2}}{2 + \\frac{1}{x} - \\frac{4}{x^2}} = \\frac{5 - 0 + 0}{2 + 0 - 0} = \\frac{5}{2}$$",
                        concept: "Any term with $x$ in the denominator vanishes as $x \\to \\infty$.",
                        mistake: "The limit is the ratio of leading coefficients when degrees are equal: $\\frac{5}{2}$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to \\infty} \\frac{5x^2 - 3x + 1}{2x^2 + x - 4} = \\frac{5}{2}$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-hard-3',
                title: 'Advanced Trigonometric Limit',
                problem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\tan(x) - x}{x^3}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of (tan(x)-x)/x^3 near origin',
                    function: 'x !== 0 ? (Math.tan(x) - x)/(x*x*x) : NaN',
                    xRange: [-1, 1],
                    yRange: [-0.2, 0.6],
                    limitPoint: {x: 0, y: 1/3, approaching: 0, isHole: true}
                },
                steps: [
                    {
                        title: "Verify indeterminate form",
                        body: "Direct substitution gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{\\tan(0) - 0}{0^3} = \\frac{0}{0}$$",
                        concept: "This requires L'Hôpital's Rule, and possibly multiple applications.",
                        mistake: "Remember: $\\tan(0) = 0$.",
                        highlightElements: []
                    },
                    {
                        title: "First application of L'Hôpital's",
                        body: "Differentiate numerator and denominator.",
                        equation: "$$\\lim_{x \\to 0} \\frac{\\tan(x) - x}{x^3} = \\lim_{x \\to 0} \\frac{\\sec^2(x) - 1}{3x^2}$$",
                        concept: "Derivative of $\\tan(x)$ is $\\sec^2(x)$.",
                        mistake: "Still $\\frac{0}{0}$ since $\\sec^2(0) = 1$. Apply L'Hôpital's again!",
                        highlightElements: []
                    },
                    {
                        title: "Second application",
                        body: "Differentiate again.",
                        equation: "$$\\lim_{x \\to 0} \\frac{\\sec^2(x) - 1}{3x^2} = \\lim_{x \\to 0} \\frac{2\\sec^2(x)\\tan(x)}{6x}$$",
                        concept: "Derivative of $\\sec^2(x)$ is $2\\sec^2(x)\\tan(x)$ by chain rule.",
                        mistake: "Still $\\frac{0}{0}$! Need one more application.",
                        highlightElements: []
                    },
                    {
                        title: "Third application and final answer",
                        body: "Apply L'Hôpital's one more time and evaluate.",
                        equation: "$$\\lim_{x \\to 0} \\frac{2\\sec^2(x)\\tan(x)}{6x}$$",
                        concept: "After the third application and simplification (using product rule on the derivative), the limit evaluates to $\\frac{1}{3}$.",
                        mistake: "This is complex! Alternatively, use Taylor series: $\\tan(x) \\approx x + \\frac{x^3}{3}$ near 0.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\frac{\\tan(x) - x}{x^3} = \\frac{1}{3}$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            },
            {
                id: 'lim-hard-4',
                title: 'Exponential Limit',
                problem: 'Evaluate $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of (e^x - 1)/x approaching x=0',
                    function: 'x !== 0 ? (Math.exp(x) - 1)/x : NaN',
                    xRange: [-2, 2],
                    yRange: [0, 2],
                    limitPoint: {x: 0, y: 1, approaching: 0, isHole: true}
                },
                steps: [
                    {
                        title: "Check for indeterminate form",
                        body: "Direct substitution gives $\\frac{0}{0}$.",
                        equation: "$$\\frac{e^0 - 1}{0} = \\frac{1-1}{0} = \\frac{0}{0}$$",
                        concept: "This is actually the definition of the derivative of $e^x$ at $x=0$!",
                        mistake: "Remember: $e^0 = 1$.",
                        highlightElements: []
                    },
                    {
                        title: "Recognize as a derivative",
                        body: "This limit is $f'(0)$ where $f(x) = e^x$.",
                        equation: "$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = \\lim_{x \\to 0} \\frac{e^x - e^0}{x - 0}$$",
                        concept: "This matches the limit definition of derivative: $f'(a) = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}$.",
                        mistake: "We know that $\\frac{d}{dx}[e^x] = e^x$, so $f'(0) = e^0 = 1$.",
                        highlightElements: []
                    },
                    {
                        title: "Alternative: L'Hôpital's Rule",
                        body: "Apply L'Hôpital's Rule directly.",
                        equation: "$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = \\lim_{x \\to 0} \\frac{e^x}{1} = e^0 = 1$$",
                        concept: "The derivative of $e^x - 1$ is $e^x$, and derivative of $x$ is $1$.",
                        mistake: "This is a fundamental limit worth memorizing: $\\lim_{x \\to 0} \\frac{e^x-1}{x} = 1$.",
                        highlightElements: ['limitPoint']
                    }
                ],
                answer: "$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$",
                colors: { limitPoint: '#ef4444', function: '#3b82f6' }
            }
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
    },
    'critical-points': {
        easy: [
            {
                id: 'cp-easy-1',
                title: 'Quadratic Function Critical Points',
                problem: 'Find all critical points of $f(x) = x^2 - 4x + 1$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of a parabola showing critical point',
                    function: 'x^2 - 4*x + 1',
                    xRange: [-1, 5],
                    yRange: [-4, 6],
                    criticalPoints: [{x: 2, y: -3, type: 'min'}]
                },
                steps: [
                    {
                        title: "Find the derivative",
                        body: "Critical points occur where the derivative equals zero or is undefined. Let's start by finding $f'(x)$.",
                        equation: "$$f(x) = x^2 - 4x + 1$$$$f'(x) = 2x - 4$$",
                        concept: "The derivative tells us the slope of the tangent line. At critical points, this slope is zero (horizontal tangent) or undefined.",
                        mistake: "Don't forget to apply the power rule correctly: the derivative of $x^2$ is $2x$, not $x$.",
                        highlightElements: []
                    },
                    {
                        title: "Set derivative equal to zero",
                        body: "Now we solve $f'(x) = 0$ to find where the function has horizontal tangents.",
                        equation: "$$f'(x) = 0$$$$2x - 4 = 0$$$$2x = 4$$$$x = 2$$",
                        concept: "This gives us the x-coordinate of our critical point. The derivative is never undefined for this polynomial.",
                        mistake: "Make sure to solve for x completely, not just identify the equation.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Find the y-coordinate",
                        body: "To get the full critical point, we need to evaluate the original function at $x = 2$.",
                        equation: "$$f(2) = (2)^2 - 4(2) + 1$$$$f(2) = 4 - 8 + 1$$$$f(2) = -3$$",
                        concept: "The critical point is at $(2, -3)$. This is the vertex of the parabola.",
                        mistake: "Don't confuse $f(x)$ with $f'(x)$. Use the original function to find the y-coordinate.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical point at $(2, -3)$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-easy-2',
                title: 'Simple Cubic Function',
                problem: 'Find the critical points of $f(x) = x^3$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of cubic function x^3',
                    function: 'x^3',
                    xRange: [-2, 2],
                    yRange: [-8, 8],
                    criticalPoints: [{x: 0, y: 0, type: 'neither'}]
                },
                steps: [
                    {
                        title: "Find the first derivative",
                        body: "Let's differentiate using the power rule.",
                        equation: "$$f(x) = x^3$$$$f'(x) = 3x^2$$",
                        concept: "Using the power rule: bring down the exponent and reduce it by 1.",
                        mistake: "Don't forget the coefficient: the derivative of $x^3$ is $3x^2$, not $x^2$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for critical points",
                        body: "Set the derivative equal to zero and solve.",
                        equation: "$$f'(x) = 0$$$$3x^2 = 0$$$$x^2 = 0$$$$x = 0$$",
                        concept: "We have one critical point at $x = 0$. The derivative is never undefined.",
                        mistake: "Make sure to fully solve: $x^2 = 0$ means $x = 0$ (only one solution).",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Find the y-coordinate",
                        body: "Evaluate $f(x)$ at $x = 0$.",
                        equation: "$$f(0) = (0)^3 = 0$$",
                        concept: "Our critical point is at $(0, 0)$, which is the origin.",
                        mistake: "Any number raised to any power (except 0^0) equals 0 if the base is 0.",
                        highlightElements: ['criticalPoint']
                    },
                    {
                        title: "Classify the critical point",
                        body: "Let's use the second derivative test.",
                        equation: "$$f''(x) = 6x$$$$f''(0) = 6(0) = 0$$",
                        concept: "The second derivative test is inconclusive! When $f''(c) = 0$, we can't determine if it's a max or min. Looking at the graph, we see it's actually a **saddle point** (inflection point), neither max nor min.",
                        mistake: "Don't assume every critical point is a max or min. Some are saddle points!",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical point at $(0, 0)$, which is **neither** a max nor min (saddle point)",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-easy-3',
                title: 'Cubic with Two Critical Points',
                problem: 'Find the critical points of $f(x) = x^3 - 3x$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of cubic function with local max and min',
                    function: 'x^3 - 3*x',
                    xRange: [-2.5, 2.5],
                    yRange: [-3, 3],
                    criticalPoints: [{x: -1, y: 2, type: 'max'}, {x: 1, y: -2, type: 'min'}]
                },
                steps: [
                    {
                        title: "Find the derivative",
                        body: "Apply the power rule to each term.",
                        equation: "$$f(x) = x^3 - 3x$$$$f'(x) = 3x^2 - 3$$",
                        concept: "The power rule gives us $3x^2$ from $x^3$, and the derivative of $-3x$ is $-3$.",
                        mistake: "Don't forget the coefficient on the linear term: derivative of $-3x$ is $-3$, not $-3x$.",
                        highlightElements: []
                    },
                    {
                        title: "Set derivative equal to zero",
                        body: "Solve $f'(x) = 0$ for critical points.",
                        equation: "$$3x^2 - 3 = 0$$$$3x^2 = 3$$$$x^2 = 1$$$$x = \\pm 1$$",
                        concept: "We have two critical points: $x = -1$ and $x = 1$.",
                        mistake: "Don't forget both solutions! $\\sqrt{1} = \\pm 1$ gives us two critical points.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Find the y-coordinates",
                        body: "Evaluate the original function at both critical x-values.",
                        equation: "$$f(-1) = (-1)^3 - 3(-1) = -1 + 3 = 2$$$$f(1) = (1)^3 - 3(1) = 1 - 3 = -2$$",
                        concept: "Our critical points are at $(-1, 2)$ and $(1, -2)$.",
                        mistake: "Be careful with signs: $(-1)^3 = -1$ (odd power keeps the sign).",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical points at $(-1, 2)$ and $(1, -2)$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-easy-4',
                title: 'Square Root Function',
                problem: 'Find the critical points of $f(x) = \\sqrt{x}$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of square root function',
                    function: 'Math.sqrt(x)',
                    xRange: [-0.5, 5],
                    yRange: [-0.5, 3],
                    criticalPoints: []
                },
                steps: [
                    {
                        title: "Rewrite using exponents",
                        body: "It's easier to differentiate if we write the square root as a power.",
                        equation: "$$f(x) = \\sqrt{x} = x^{1/2}$$",
                        concept: "Remember: $\\sqrt{x} = x^{1/2}$. This form makes the power rule straightforward.",
                        mistake: "Don't try to differentiate $\\sqrt{x}$ directly - convert to exponential form first.",
                        highlightElements: []
                    },
                    {
                        title: "Find the derivative",
                        body: "Apply the power rule: bring down the exponent and reduce by 1.",
                        equation: "$$f'(x) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$$",
                        concept: "The derivative exists only for $x > 0$ since we can't divide by zero or take square root of negative numbers.",
                        mistake: "Don't forget the domain! The derivative is undefined at $x = 0$.",
                        highlightElements: []
                    },
                    {
                        title: "Find where derivative equals zero",
                        body: "Let's solve $f'(x) = 0$.",
                        equation: "$$\\frac{1}{2\\sqrt{x}} = 0$$",
                        concept: "This equation has no solution! A fraction equals zero only when its numerator is zero, but the numerator here is 1.",
                        mistake: "Don't confuse undefined with zero. $\\frac{1}{2\\sqrt{x}}$ is never zero, just undefined at $x=0$.",
                        highlightElements: []
                    },
                    {
                        title: "Check where derivative is undefined",
                        body: "The derivative is undefined at $x = 0$, but is $x = 0$ in the domain of $f$?",
                        equation: "$$f(0) = \\sqrt{0} = 0$$",
                        concept: "Yes! $x = 0$ is in the domain of $f(x) = \\sqrt{x}$, so it IS a critical point. However, the function is only defined for $x \\geq 0$, so there's no 'local' behavior here - it's an endpoint.",
                        mistake: "Critical points include where $f'$ is undefined, but the point must be in the domain of $f$.",
                        highlightElements: []
                    }
                ],
                answer: "Critical point at $x = 0$ (endpoint, derivative undefined)",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            }
        ],
        medium: [
            {
                id: 'cp-med-1',
                title: 'Classify Critical Points',
                problem: 'Find the critical points and classify them: $f(x) = x^3 - 6x^2 + 9x$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of cubic with local max and min',
                    function: 'x^3 - 6*x^2 + 9*x',
                    xRange: [-1, 4],
                    yRange: [-2, 6],
                    criticalPoints: [{x: 1, y: 4, type: 'max'}, {x: 3, y: 0, type: 'min'}]
                },
                steps: [
                    {
                        title: "Find the derivative",
                        body: "Use the power rule on each term.",
                        equation: "$$f(x) = x^3 - 6x^2 + 9x$$$$f'(x) = 3x^2 - 12x + 9$$",
                        concept: "Each term is differentiated independently using the power rule.",
                        mistake: "Don't forget coefficients: derivative of $-6x^2$ is $-12x$, not $-6x$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for critical points",
                        body: "Set $f'(x) = 0$ and factor.",
                        equation: "$$3x^2 - 12x + 9 = 0$$$$3(x^2 - 4x + 3) = 0$$$$3(x-1)(x-3) = 0$$$$x = 1 \\text{ or } x = 3$$",
                        concept: "Factoring makes it easy to find the roots. We can factor out 3 first to simplify.",
                        mistake: "Make sure to find all solutions. Check your factoring: $(x-1)(x-3) = x^2 - 4x + 3$.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Find y-coordinates",
                        body: "Evaluate $f(x)$ at both critical points.",
                        equation: "$$f(1) = (1)^3 - 6(1)^2 + 9(1) = 1 - 6 + 9 = 4$$$$f(3) = (3)^3 - 6(3)^2 + 9(3) = 27 - 54 + 27 = 0$$",
                        concept: "Critical points are at $(1, 4)$ and $(3, 0)$.",
                        mistake: "Be careful with arithmetic, especially with multiple terms.",
                        highlightElements: ['criticalPoint']
                    },
                    {
                        title: "Classify using second derivative",
                        body: "Find $f''(x)$ and test each critical point.",
                        equation: "$$f''(x) = 6x - 12$$$$f''(1) = 6(1) - 12 = -6 < 0 \\rightarrow \\text{local max}$$$$f''(3) = 6(3) - 12 = 6 > 0 \\rightarrow \\text{local min}$$",
                        concept: "Negative second derivative means concave down (max), positive means concave up (min).",
                        mistake: "Test each critical point separately - don't assume they're the same type!",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "$(1, 4)$ is a **local max**, $(3, 0)$ is a **local min**",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-med-2',
                title: 'Quartic Function',
                problem: 'Find the critical points of $f(x) = x^4 - 4x^2$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of quartic with three critical points',
                    function: 'x^4 - 4*x^2',
                    xRange: [-3, 3],
                    yRange: [-5, 10],
                    criticalPoints: [{x: -Math.sqrt(2), y: -4, type: 'min'}, {x: 0, y: 0, type: 'max'}, {x: Math.sqrt(2), y: -4, type: 'min'}]
                },
                steps: [
                    {
                        title: "Find the derivative",
                        body: "Apply the power rule.",
                        equation: "$$f(x) = x^4 - 4x^2$$$$f'(x) = 4x^3 - 8x$$",
                        concept: "Straightforward application of the power rule to each term.",
                        mistake: "The derivative of $x^4$ is $4x^3$, not $4x$.",
                        highlightElements: []
                    },
                    {
                        title: "Factor and solve",
                        body: "Factor out common terms to find critical points.",
                        equation: "$$4x^3 - 8x = 0$$$$4x(x^2 - 2) = 0$$$$x = 0 \\text{ or } x^2 = 2$$$$x = 0, \\pm\\sqrt{2}$$",
                        concept: "We have three critical points! Always factor completely before solving.",
                        mistake: "Don't forget $x = 0$ from the factored $4x$. And remember $x^2 = 2$ gives two solutions: $\\pm\\sqrt{2}$.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Evaluate at critical points",
                        body: "Find the y-coordinates.",
                        equation: "$$f(0) = 0$$$$f(\\sqrt{2}) = (\\sqrt{2})^4 - 4(\\sqrt{2})^2 = 4 - 8 = -4$$$$f(-\\sqrt{2}) = 4 - 8 = -4$$",
                        concept: "By symmetry, $f(\\sqrt{2}) = f(-\\sqrt{2})$. Critical points: $(0, 0)$, $(\\sqrt{2}, -4)$, $(-\\sqrt{2}, -4)$.",
                        mistake: "Remember: $(\\sqrt{2})^2 = 2$ and $(\\sqrt{2})^4 = 4$.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical points: $(0, 0)$, $(\\sqrt{2}, -4)$, $(-\\sqrt{2}, -4)$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-med-3',
                title: 'Rational Function Critical Numbers',
                problem: 'Find all critical numbers of $f(x) = \\frac{x}{x^2+1}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of rational function with two critical points',
                    function: 'x/(x^2+1)',
                    xRange: [-4, 4],
                    yRange: [-0.6, 0.6],
                    criticalPoints: [{x: -1, y: -0.5, type: 'min'}, {x: 1, y: 0.5, type: 'max'}]
                },
                steps: [
                    {
                        title: "Use the quotient rule",
                        body: "For $f(x) = \\frac{u}{v}$, we have $f'(x) = \\frac{u'v - uv'}{v^2}$.",
                        equation: "$$u = x, \\quad u' = 1$$$$v = x^2 + 1, \\quad v' = 2x$$$$f'(x) = \\frac{(1)(x^2+1) - (x)(2x)}{(x^2+1)^2}$$",
                        concept: "The quotient rule is needed for rational functions.",
                        mistake: "Order matters! It's $u'v - uv'$, not the other way around.",
                        highlightElements: []
                    },
                    {
                        title: "Simplify the numerator",
                        body: "Expand and combine terms.",
                        equation: "$$f'(x) = \\frac{x^2 + 1 - 2x^2}{(x^2+1)^2} = \\frac{1 - x^2}{(x^2+1)^2}$$",
                        concept: "The denominator $(x^2+1)^2$ is always positive, so we only need to check the numerator.",
                        mistake: "Combine like terms carefully: $x^2 - 2x^2 = -x^2$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for critical points",
                        body: "Set the numerator equal to zero (denominator is never zero).",
                        equation: "$$1 - x^2 = 0$$$$x^2 = 1$$$$x = \\pm 1$$",
                        concept: "Since $x^2 + 1$ is never zero, there are no points where $f'$ is undefined in the domain.",
                        mistake: "Remember both $+1$ and $-1$ are solutions to $x^2 = 1$.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Find the y-values",
                        body: "Evaluate $f(x)$ at both critical numbers.",
                        equation: "$$f(-1) = \\frac{-1}{(-1)^2+1} = \\frac{-1}{2} = -0.5$$$$f(1) = \\frac{1}{1^2+1} = \\frac{1}{2} = 0.5$$",
                        concept: "Critical points are at $(-1, -0.5)$ and $(1, 0.5)$.",
                        mistake: "Don't forget the negative sign for $f(-1)$.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical numbers: $x = -1$ and $x = 1$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-med-4',
                title: 'Function with Fractional Exponent',
                problem: 'Find the critical points of $f(x) = x^{2/3}(x-2)$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph showing critical points including cusp',
                    function: 'Math.pow(Math.abs(x), 2/3) * (x < 0 ? -1 : 1) * (x-2)',
                    xRange: [-2, 4],
                    yRange: [-2, 2],
                    criticalPoints: [{x: 0, y: 0, type: 'neither'}, {x: 0.8, y: -0.91, type: 'min'}]
                },
                steps: [
                    {
                        title: "Expand the function",
                        body: "First, let's multiply out the expression.",
                        equation: "$$f(x) = x^{2/3}(x-2) = x^{5/3} - 2x^{2/3}$$",
                        concept: "When multiplying powers: $x^{2/3} \\cdot x = x^{2/3} \\cdot x^1 = x^{2/3+1} = x^{5/3}$.",
                        mistake: "Be careful with fractional exponents: $\\frac{2}{3} + 1 = \\frac{2}{3} + \\frac{3}{3} = \\frac{5}{3}$.",
                        highlightElements: []
                    },
                    {
                        title: "Find the derivative",
                        body: "Use the power rule with fractional exponents.",
                        equation: "$$f'(x) = \\frac{5}{3}x^{2/3} - 2 \\cdot \\frac{2}{3}x^{-1/3}$$$$f'(x) = \\frac{5}{3}x^{2/3} - \\frac{4}{3}x^{-1/3}$$",
                        concept: "The power rule works with any exponent: bring it down and subtract 1.",
                        mistake: "Don't forget to apply the chain rule correctly with fractional powers.",
                        highlightElements: []
                    },
                    {
                        title: "Factor and simplify",
                        body: "Factor out the common term with the smallest exponent.",
                        equation: "$$f'(x) = \\frac{1}{3}x^{-1/3}(5x - 4) = \\frac{5x - 4}{3x^{1/3}}$$",
                        concept: "$f'(x) = 0$ when $5x - 4 = 0$, so $x = \\frac{4}{5} = 0.8$. Also, $f'$ is undefined at $x = 0$.",
                        mistake: "Both places where $f' = 0$ AND where $f'$ is undefined are critical points (if in domain of $f$).",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Identify critical points",
                        body: "We have two critical points: where $f' = 0$ and where $f'$ is undefined.",
                        equation: "$$x = \\frac{4}{5} \\text{ and } x = 0$$$$f(0.8) = (0.8)^{2/3}(0.8-2) \\approx -0.91$$$$f(0) = 0^{2/3}(0-2) = 0$$",
                        concept: "At $x = 0$, the function has a cusp (sharp point) where the derivative doesn't exist.",
                        mistake: "Don't skip $x = 0$ just because the derivative is undefined there!",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical points: $x = 0$ and $x = \\frac{4}{5}$ (or $x = 0.8$)",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            }
        ],
        hard: [
            {
                id: 'cp-hard-1',
                title: 'Complex Rational Function',
                problem: 'Find the critical points of $f(x) = \\frac{x^2-1}{x^3}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of rational function with asymptote at origin',
                    function: '(x^2-1)/(x^3)',
                    xRange: [-3, 3],
                    yRange: [-10, 10],
                    criticalPoints: [{x: -1.5, y: -1.48, type: 'min'}, {x: 1.5, y: 0.148, type: 'max'}],
                    asymptotes: [{x: 0, type: 'vertical'}]
                },
                steps: [
                    {
                        title: "Apply the quotient rule",
                        body: "For $f(x) = \\frac{u}{v}$: $f'(x) = \\frac{u'v - uv'}{v^2}$",
                        equation: "$$u = x^2 - 1, \\quad u' = 2x$$$$v = x^3, \\quad v' = 3x^2$$$$f'(x) = \\frac{(2x)(x^3) - (x^2-1)(3x^2)}{(x^3)^2}$$",
                        concept: "The quotient rule requires careful bookkeeping of all terms.",
                        mistake: "Don't forget to square the denominator in the quotient rule!",
                        highlightElements: []
                    },
                    {
                        title: "Simplify the numerator",
                        body: "Expand and factor the numerator.",
                        equation: "$$f'(x) = \\frac{2x^4 - 3x^4 + 3x^2}{x^6} = \\frac{-x^4 + 3x^2}{x^6}$$$$f'(x) = \\frac{x^2(-x^2 + 3)}{x^6} = \\frac{-x^2 + 3}{x^4} = \\frac{3 - x^2}{x^4}$$",
                        concept: "Factor out common terms and cancel where possible.",
                        mistake: "Be careful with signs when combining like terms: $2x^4 - 3x^4 = -x^4$.",
                        highlightElements: []
                    },
                    {
                        title: "Find critical points",
                        body: "Numerator = 0 or denominator = 0 (but must be in domain of $f$).",
                        equation: "$$3 - x^2 = 0 \\rightarrow x^2 = 3 \\rightarrow x = \\pm\\sqrt{3}$$",
                        concept: "$x = 0$ is NOT in the domain of $f$ (vertical asymptote), so it's not a critical point.",
                        mistake: "A critical point must be in the domain of the original function!",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Evaluate the function",
                        body: "Find y-values at the critical points.",
                        equation: "$$f(\\sqrt{3}) = \\frac{(\\sqrt{3})^2-1}{(\\sqrt{3})^3} = \\frac{3-1}{3\\sqrt{3}} = \\frac{2}{3\\sqrt{3}} \\approx 0.385$$$$f(-\\sqrt{3}) = \\frac{2}{-3\\sqrt{3}} \\approx -0.385$$",
                        concept: "Critical points: $(\\sqrt{3}, \\frac{2}{3\\sqrt{3}})$ and $(-\\sqrt{3}, -\\frac{2}{3\\sqrt{3}})$.",
                        mistake: "Remember: $(\\sqrt{3})^3 = \\sqrt{3}^2 \\cdot \\sqrt{3} = 3\\sqrt{3}$.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical points at $x = \\sqrt{3}$ and $x = -\\sqrt{3}$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6', asymptote: '#9ca3af' }
            },
            {
                id: 'cp-hard-2',
                title: 'Square Root of Quadratic',
                problem: 'Find all critical points of $f(x) = \\sqrt{4-x^2}$',
                visual: {
                    type: 'function-graph',
                    description: 'Semicircle graph',
                    function: 'Math.sqrt(4-x^2)',
                    xRange: [-3, 3],
                    yRange: [-0.5, 2.5],
                    criticalPoints: [{x: 0, y: 2, type: 'max'}]
                },
                steps: [
                    {
                        title: "Identify the domain",
                        body: "We need $4 - x^2 \\geq 0$ for the square root to be defined.",
                        equation: "$$4 - x^2 \\geq 0$$$$x^2 \\leq 4$$$$-2 \\leq x \\leq 2$$",
                        concept: "The domain is $[-2, 2]$. The function is only defined in this interval.",
                        mistake: "Always check the domain before finding critical points!",
                        highlightElements: []
                    },
                    {
                        title: "Find the derivative using chain rule",
                        body: "Rewrite as $(4-x^2)^{1/2}$ and use the chain rule.",
                        equation: "$$f(x) = (4-x^2)^{1/2}$$$$f'(x) = \\frac{1}{2}(4-x^2)^{-1/2} \\cdot (-2x)$$$$f'(x) = \\frac{-x}{\\sqrt{4-x^2}}$$",
                        concept: "Chain rule: derivative of outer function times derivative of inner function.",
                        mistake: "Don't forget the $-2x$ from the chain rule!",
                        highlightElements: []
                    },
                    {
                        title: "Find where derivative equals zero",
                        body: "Set the numerator equal to zero.",
                        equation: "$$\\frac{-x}{\\sqrt{4-x^2}} = 0$$$$-x = 0$$$$x = 0$$",
                        concept: "A fraction equals zero when its numerator equals zero (and denominator is non-zero).",
                        mistake: "The denominator is never zero in the interior of the domain.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Check endpoints and undefined points",
                        body: "The derivative is undefined at $x = \\pm 2$ (endpoints of domain).",
                        equation: "$$f(0) = \\sqrt{4-0} = 2$$$$f(-2) = \\sqrt{4-4} = 0$$$$f(2) = 0$$",
                        concept: "We have one critical point at $x = 0$ (where $f' = 0$), plus endpoints $x = \\pm 2$.",
                        mistake: "Endpoints are critical points when finding absolute max/min on a closed interval.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical point at $x = 0$; endpoints at $x = \\pm 2$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-hard-3',
                title: 'Exponential Function',
                problem: 'Find the critical points of $f(x) = xe^{-x}$',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of x times exponential decay',
                    function: 'x*Math.exp(-x)',
                    xRange: [-1, 6],
                    yRange: [-0.5, 0.5],
                    criticalPoints: [{x: 1, y: 0.368, type: 'max'}]
                },
                steps: [
                    {
                        title: "Use the product rule",
                        body: "For $f(x) = u \\cdot v$: $f'(x) = u'v + uv'$",
                        equation: "$$u = x, \\quad u' = 1$$$$v = e^{-x}, \\quad v' = -e^{-x}$$$$f'(x) = (1)(e^{-x}) + (x)(-e^{-x})$$$$f'(x) = e^{-x} - xe^{-x}$$",
                        concept: "The product rule is needed when multiplying two functions.",
                        mistake: "Don't forget the chain rule when differentiating $e^{-x}$: derivative is $-e^{-x}$.",
                        highlightElements: []
                    },
                    {
                        title: "Factor out common terms",
                        body: "Factor $e^{-x}$ from both terms.",
                        equation: "$$f'(x) = e^{-x}(1 - x)$$",
                        concept: "Since $e^{-x}$ is never zero, we only need to solve $1 - x = 0$.",
                        mistake: "Remember: $e^{-x} > 0$ for all real $x$, so it never equals zero.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for critical points",
                        body: "Set $f'(x) = 0$.",
                        equation: "$$e^{-x}(1-x) = 0$$$$1 - x = 0$$$$x = 1$$",
                        concept: "We have one critical point at $x = 1$.",
                        mistake: "The exponential part never equals zero, so only solve the linear factor.",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Evaluate the function",
                        body: "Find the y-coordinate.",
                        equation: "$$f(1) = 1 \\cdot e^{-1} = \\frac{1}{e} \\approx 0.368$$",
                        concept: "The critical point is at $(1, \\frac{1}{e})$. This is a maximum.",
                        mistake: "Remember: $e^{-1} = \\frac{1}{e} \\approx 0.368$.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical point at $(1, \\frac{1}{e})$ or approximately $(1, 0.368)$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            },
            {
                id: 'cp-hard-4',
                title: 'Critical Points on Closed Interval',
                problem: 'Find the critical points on $[-1, 2]$: $f(x) = x^3 - 3x^2 + 2$',
                visual: {
                    type: 'function-graph',
                    description: 'Cubic function on restricted domain',
                    function: 'x^3 - 3*x^2 + 2',
                    xRange: [-1.5, 2.5],
                    yRange: [-2, 4],
                    criticalPoints: [{x: 0, y: 2, type: 'max'}, {x: 2, y: -2, type: 'min'}]
                },
                steps: [
                    {
                        title: "Find the derivative",
                        body: "Use the power rule.",
                        equation: "$$f(x) = x^3 - 3x^2 + 2$$$$f'(x) = 3x^2 - 6x$$",
                        concept: "Standard power rule application. The constant disappears.",
                        mistake: "Derivative of a constant is always zero.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for critical points",
                        body: "Factor and solve $f'(x) = 0$.",
                        equation: "$$3x^2 - 6x = 0$$$$3x(x - 2) = 0$$$$x = 0 \\text{ or } x = 2$$",
                        concept: "Both $x = 0$ and $x = 2$ are in the interval $[-1, 2]$.",
                        mistake: "Always check that critical points are in the specified interval!",
                        highlightElements: ['criticalX']
                    },
                    {
                        title: "Check the endpoints",
                        body: "For max/min problems on closed intervals, always check endpoints too.",
                        equation: "$$f(-1) = (-1)^3 - 3(-1)^2 + 2 = -1 - 3 + 2 = -2$$$$f(0) = 0 - 0 + 2 = 2$$$$f(2) = 8 - 12 + 2 = -2$$",
                        concept: "We have critical points at $x = 0$ and $x = 2$, plus endpoint $x = -1$.",
                        mistake: "On closed intervals, endpoints are also candidates for max/min.",
                        highlightElements: ['criticalPoint']
                    },
                    {
                        title: "Identify absolute extrema",
                        body: "Compare function values to find absolute max and min on $[-1, 2]$.",
                        equation: "$$f(-1) = -2, \\quad f(0) = 2, \\quad f(2) = -2$$",
                        concept: "Absolute maximum: $(0, 2)$. Absolute minimum: both $(-1, -2)$ and $(2, -2)$.",
                        mistake: "Don't confuse critical points with absolute extrema. You need to compare values.",
                        highlightElements: ['criticalPoint']
                    }
                ],
                answer: "Critical points: $x = 0$ and $x = 2$. Absolute max at $(0, 2)$, absolute min at $(-1, -2)$ and $(2, -2)$",
                colors: { criticalPoint: '#ef4444', derivative: '#3b82f6' }
            }
        ]
    },
    'inflection-points': {
        easy: [
            {
                id: 'ip-easy-1',
                title: 'Simple Cubic Function',
                problem: 'Find all inflection points of $f(x) = x^3$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of x cubed showing inflection point at origin',
                    function: 'x^3',
                    xRange: [-2, 2],
                    yRange: [-8, 8],
                    inflectionPoints: [{x: 0, y: 0}]
                },
                steps: [
                    {
                        title: "Find the first derivative",
                        body: "Start by finding the first derivative.",
                        equation: "$$f(x) = x^3$$$$f'(x) = 3x^2$$",
                        concept: "We need the first derivative before we can find the second derivative.",
                        mistake: "Don't skip the first derivative step - it's needed to get to $f''(x)$.",
                        highlightElements: []
                    },
                    {
                        title: "Find the second derivative",
                        body: "Now differentiate again to find $f''(x)$.",
                        equation: "$$f'(x) = 3x^2$$$$f''(x) = 6x$$",
                        concept: "The second derivative tells us about concavity. When it changes sign, we have an inflection point.",
                        mistake: "Don't confuse critical points (where $f' = 0$) with inflection points (where $f'' = 0$).",
                        highlightElements: []
                    },
                    {
                        title: "Solve for potential inflection points",
                        body: "Set the second derivative equal to zero.",
                        equation: "$$f''(x) = 0$$$$6x = 0$$$$x = 0$$",
                        concept: "We have a candidate at $x = 0$. But we need to verify concavity actually changes.",
                        mistake: "Just because $f''(x) = 0$ doesn't guarantee an inflection point - always verify!",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity change",
                        body: "Check the sign of $f''(x)$ on both sides of $x = 0$.",
                        equation: "$$f''(-1) = 6(-1) = -6 < 0 \\quad \\text{(concave down)}$$$$f''(1) = 6(1) = 6 > 0 \\quad \\text{(concave up)}$$",
                        concept: "The concavity changes from down to up at $x = 0$, confirming it's an inflection point! The graph has an S-shape passing through the origin.",
                        mistake: "Always test points on BOTH sides of the candidate to confirm a sign change.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection point at $(0, 0)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-easy-2',
                title: 'Cubic with Inflection Point',
                problem: 'Find the inflection point(s) of $f(x) = x^3 - 6x$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of cubic function with inflection point',
                    function: 'x^3 - 6*x',
                    xRange: [-3, 3],
                    yRange: [-10, 10],
                    inflectionPoints: [{x: 0, y: 0}]
                },
                steps: [
                    {
                        title: "Find first and second derivatives",
                        body: "Differentiate twice to get the second derivative.",
                        equation: "$$f(x) = x^3 - 6x$$$$f'(x) = 3x^2 - 6$$$$f''(x) = 6x$$",
                        concept: "Apply the power rule to each term twice.",
                        mistake: "Don't forget that the derivative of a constant is zero, so $-6$ becomes $0$ in $f''(x)$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for candidates",
                        body: "Set $f''(x) = 0$ and solve.",
                        equation: "$$f''(x) = 0$$$$6x = 0$$$$x = 0$$",
                        concept: "We have one candidate: $x = 0$.",
                        mistake: "This is the same as the first problem, just with different coefficients in $f(x)$.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity change",
                        body: "Test the sign of $f''(x)$ on both sides of $x = 0$.",
                        equation: "$$f''(-1) = 6(-1) = -6 < 0 \\quad \\text{(concave down)}$$$$f''(1) = 6(1) = 6 > 0 \\quad \\text{(concave up)}$$",
                        concept: "Concavity changes from down to up at $x = 0$, so it's an inflection point!",
                        mistake: "Always verify - don't assume $f''(c) = 0$ automatically means inflection point.",
                        highlightElements: ['inflectionPoint']
                    },
                    {
                        title: "Find the coordinates",
                        body: "Evaluate the original function at $x = 0$.",
                        equation: "$$f(0) = (0)^3 - 6(0) = 0$$",
                        concept: "The inflection point is at $(0, 0)$.",
                        mistake: "Use the original function $f(x)$, not $f''(x)$, to find the y-coordinate.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection point at $(0, 0)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-easy-3',
                title: 'Quartic Concavity Changes',
                problem: 'Find where concavity changes for $f(x) = x^4$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of x^4 showing no inflection points',
                    function: 'x^4',
                    xRange: [-2, 2],
                    yRange: [-1, 16],
                    inflectionPoints: []
                },
                steps: [
                    {
                        title: "Find derivatives",
                        body: "Find the first and second derivatives.",
                        equation: "$$f(x) = x^4$$$$f'(x) = 4x^3$$$$f''(x) = 12x^2$$",
                        concept: "Apply the power rule twice.",
                        mistake: "Don't forget to bring down the coefficient each time: $4 \\times 3 = 12$.",
                        highlightElements: []
                    },
                    {
                        title: "Set second derivative to zero",
                        body: "Solve $f''(x) = 0$.",
                        equation: "$$12x^2 = 0$$$$x^2 = 0$$$$x = 0$$",
                        concept: "We have a candidate at $x = 0$.",
                        mistake: "We have a solution, but does it produce an inflection point?",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Test for concavity change",
                        body: "Check the sign of $f''(x)$ on both sides of $x = 0$.",
                        equation: "$$f''(-1) = 12(-1)^2 = 12 > 0 \\quad \\text{(concave up)}$$$$f''(1) = 12(1)^2 = 12 > 0 \\quad \\text{(concave up)}$$",
                        concept: "The concavity does NOT change! It's concave up on both sides.",
                        mistake: "Just because $f''(0) = 0$ doesn't mean we have an inflection point. We need a sign change!",
                        highlightElements: []
                    },
                    {
                        title: "Conclusion",
                        body: "Since concavity doesn't change, there are no inflection points.",
                        equation: "$$f''(x) = 12x^2 \\geq 0 \\text{ for all } x$$",
                        concept: "The function $f(x) = x^4$ is concave up everywhere (U-shaped). At $x = 0$, the curvature is minimal but doesn't change direction.",
                        mistake: "Remember: inflection points require a concavity CHANGE, not just $f''(x) = 0$.",
                        highlightElements: []
                    }
                ],
                answer: "**No inflection points** (concave up everywhere, no concavity change)",
                colors: { concavity: '#8b5cf6' }
            },
            {
                id: 'ip-easy-4',
                title: 'Cubic with Shifted Inflection',
                problem: 'Find the inflection point(s) of $f(x) = x^3 + 3x^2$.',
                visual: {
                    type: 'function-graph',
                    description: 'Graph of cubic with inflection point',
                    function: 'x^3 + 3*x^2',
                    xRange: [-4, 2],
                    yRange: [-5, 10],
                    inflectionPoints: [{x: -1, y: 2}]
                },
                steps: [
                    {
                        title: "Find the derivatives",
                        body: "Differentiate twice.",
                        equation: "$$f(x) = x^3 + 3x^2$$$$f'(x) = 3x^2 + 6x$$$$f''(x) = 6x + 6$$",
                        concept: "Apply the power rule to each term.",
                        mistake: "The derivative of $3x^2$ is $6x$, not $3x$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for candidates",
                        body: "Set $f''(x) = 0$.",
                        equation: "$$6x + 6 = 0$$$$6x = -6$$$$x = -1$$",
                        concept: "We have a candidate at $x = -1$.",
                        mistake: "Don't forget to move the constant to the other side and divide.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity change",
                        body: "Test the sign of $f''(x)$ around $x = -1$.",
                        equation: "$$f''(-2) = 6(-2) + 6 = -6 < 0 \\quad \\text{(concave down)}$$$$f''(0) = 6(0) + 6 = 6 > 0 \\quad \\text{(concave up)}$$",
                        concept: "Concavity changes from down to up at $x = -1$, so it's an inflection point!",
                        mistake: "Always check both sides to confirm the sign actually changes.",
                        highlightElements: ['inflectionPoint']
                    },
                    {
                        title: "Find the coordinates",
                        body: "Evaluate $f(-1)$.",
                        equation: "$$f(-1) = (-1)^3 + 3(-1)^2$$$$f(-1) = -1 + 3 = 2$$",
                        concept: "The inflection point is at $(-1, 2)$.",
                        mistake: "Remember: $(-1)^3 = -1$ but $(-1)^2 = 1$.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection point at $(-1, 2)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            }
        ],
        medium: [
            {
                id: 'ip-med-1',
                title: 'Quartic with Two Inflection Points',
                problem: 'Find all inflection points of $f(x) = x^4 - 2x^2$.',
                visual: {
                    type: 'function-graph',
                    description: 'W-shaped quartic with inflection points',
                    function: 'x^4 - 2*x^2',
                    xRange: [-2, 2],
                    yRange: [-2, 5],
                    inflectionPoints: [{x: -0.577, y: -0.667}, {x: 0.577, y: -0.667}]
                },
                steps: [
                    {
                        title: "Find derivatives",
                        body: "Compute first and second derivatives.",
                        equation: "$$f(x) = x^4 - 2x^2$$$$f'(x) = 4x^3 - 4x$$$$f''(x) = 12x^2 - 4$$",
                        concept: "Standard power rule application.",
                        mistake: "Be careful with signs: derivative of $-2x^2$ is $-4x$.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for candidates",
                        body: "Set $f''(x) = 0$ and solve.",
                        equation: "$$12x^2 - 4 = 0$$$$12x^2 = 4$$$$x^2 = \\frac{1}{3}$$$$x = \\pm\\frac{1}{\\sqrt{3}} = \\pm\\frac{\\sqrt{3}}{3} \\approx \\pm 0.577$$",
                        concept: "We have two candidates. Remember to rationalize if needed.",
                        mistake: "Don't forget both positive and negative solutions!",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity changes",
                        body: "Test concavity in three regions.",
                        equation: "$$f''(-1) = 12(1) - 4 = 8 > 0$$$$f''(0) = 12(0) - 4 = -4 < 0$$$$f''(1) = 12(1) - 4 = 8 > 0$$",
                        concept: "At $x = -\\frac{\\sqrt{3}}{3}$: changes from up to down. At $x = \\frac{\\sqrt{3}}{3}$: changes from down to up. Both are inflection points!",
                        mistake: "Test a point between the two candidates, not just outside.",
                        highlightElements: ['inflectionPoint']
                    },
                    {
                        title: "Find coordinates",
                        body: "Evaluate at both inflection points.",
                        equation: "$$f\\left(\\pm\\frac{\\sqrt{3}}{3}\\right) = \\left(\\frac{1}{3}\\right)^2 - 2\\left(\\frac{1}{3}\\right) = \\frac{1}{9} - \\frac{2}{3} = -\\frac{5}{9} \\approx -0.556$$",
                        concept: "By symmetry, both points have the same y-value.",
                        mistake: "Use $x^2 = \\frac{1}{3}$ to simplify: $x^4 = (x^2)^2 = \\frac{1}{9}$.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection points at $\\left(-\\frac{\\sqrt{3}}{3}, -\\frac{5}{9}\\right)$ and $\\left(\\frac{\\sqrt{3}}{3}, -\\frac{5}{9}\\right)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-med-2',
                title: 'Logarithmic Function Concavity',
                problem: 'Determine intervals of concavity and inflection points: $f(x) = \\ln(x^2+1)$',
                visual: {
                    type: 'function-graph',
                    description: 'Logarithm of quadratic with inflection points',
                    function: 'Math.log(x*x+1)',
                    xRange: [-3, 3],
                    yRange: [-0.5, 2.5],
                    inflectionPoints: [{x: -1, y: Math.log(2)}, {x: 1, y: Math.log(2)}]
                },
                steps: [
                    {
                        title: "Find first derivative using chain rule",
                        body: "For $\\ln(u)$, derivative is $\\frac{u'}{u}$.",
                        equation: "$$f(x) = \\ln(x^2+1)$$$$f'(x) = \\frac{2x}{x^2+1}$$",
                        concept: "Chain rule: outer derivative times inner derivative.",
                        mistake: "Don't forget the chain rule! The $2x$ comes from differentiating $x^2+1$.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative using quotient rule",
                        body: "Apply quotient rule to $\\frac{2x}{x^2+1}$.",
                        equation: "$$f''(x) = \\frac{(2)(x^2+1) - (2x)(2x)}{(x^2+1)^2}$$$$f''(x) = \\frac{2x^2 + 2 - 4x^2}{(x^2+1)^2} = \\frac{2 - 2x^2}{(x^2+1)^2}$$",
                        concept: "The quotient rule gives us the second derivative.",
                        mistake: "Be careful with signs when expanding the numerator.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for inflection points",
                        body: "Set numerator equal to zero (denominator is never zero).",
                        equation: "$$2 - 2x^2 = 0$$$$2x^2 = 2$$$$x^2 = 1$$$$x = \\pm 1$$",
                        concept: "Two candidates at $x = -1$ and $x = 1$.",
                        mistake: "The denominator is always positive, so only check the numerator.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify and find coordinates",
                        body: "Test concavity changes and evaluate.",
                        equation: "$$f''(0) = \\frac{2 - 0}{1} = 2 > 0 \\quad \\text{(concave up)}$$$$f''(2) = \\frac{2 - 8}{25} < 0 \\quad \\text{(concave down)}$$$$f(\\pm 1) = \\ln(2) \\approx 0.693$$",
                        concept: "Concavity changes at both points. Inflection points at $(\\pm 1, \\ln 2)$.",
                        mistake: "By symmetry, both inflection points have the same y-value.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection points at $(-1, \\ln 2)$ and $(1, \\ln 2)$. Concave up on $(-1, 1)$, concave down on $(-\\infty, -1)$ and $(1, \\infty)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-med-3',
                title: 'Fifth Degree Polynomial',
                problem: 'Find inflection points of $f(x) = x^5 - 5x^3$.',
                visual: {
                    type: 'function-graph',
                    description: 'Fifth degree polynomial with three inflection points',
                    function: 'x**5 - 5*x**3',
                    xRange: [-2.5, 2.5],
                    yRange: [-8, 8],
                    inflectionPoints: [{x: -1, y: 4}, {x: 0, y: 0}, {x: 1, y: -4}]
                },
                steps: [
                    {
                        title: "Find derivatives",
                        body: "Differentiate twice.",
                        equation: "$$f(x) = x^5 - 5x^3$$$$f'(x) = 5x^4 - 15x^2$$$$f''(x) = 20x^3 - 30x$$",
                        concept: "Power rule application to each term.",
                        mistake: "Keep track of coefficients: $5 \\times 4 = 20$ and $-5 \\times 3 = -15$.",
                        highlightElements: []
                    },
                    {
                        title: "Factor and solve",
                        body: "Factor $f''(x)$ completely.",
                        equation: "$$20x^3 - 30x = 0$$$$10x(2x^2 - 3) = 0$$$$x = 0 \\text{ or } x^2 = \\frac{3}{2}$$$$x = 0, \\pm\\sqrt{\\frac{3}{2}} \\approx 0, \\pm 1.225$$",
                        concept: "Three candidates! Higher degree polynomials can have multiple inflection points.",
                        mistake: "Don't forget $x = 0$ from the factored $x$ term.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity changes",
                        body: "Test in four regions.",
                        equation: "$$f''(-2) = 20(-8) - 30(-2) = -160 + 60 < 0$$$$f''(-1) = 20(-1) - 30(-1) = -20 + 30 > 0$$$$f''(1) = 20(1) - 30(1) = -10 < 0$$$$f''(2) = 20(8) - 30(2) = 100 > 0$$",
                        concept: "Concavity changes at all three points!",
                        mistake: "Test between each pair of consecutive candidates.",
                        highlightElements: ['inflectionPoint']
                    },
                    {
                        title: "Find coordinates",
                        body: "Evaluate at all three inflection points.",
                        equation: "$$f(0) = 0$$$$f(\\sqrt{3/2}) \\approx (1.225)^5 - 5(1.225)^3 \\approx -4.67$$$$f(-\\sqrt{3/2}) \\approx 4.67$$",
                        concept: "Three inflection points by symmetry.",
                        mistake: "Odd functions like this have origin symmetry.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection points at $(0, 0)$, $(\\sqrt{3/2}, \\text{value})$, and $(-\\sqrt{3/2}, \\text{value})$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-med-4',
                title: 'Rational Function Concavity',
                problem: 'Find where the function changes concavity: $f(x) = \\frac{1}{x^2+1}$',
                visual: {
                    type: 'function-graph',
                    description: 'Bell-shaped rational function',
                    function: '1/(x*x+1)',
                    xRange: [-4, 4],
                    yRange: [-0.2, 1.2],
                    inflectionPoints: [{x: -0.577, y: 0.75}, {x: 0.577, y: 0.75}]
                },
                steps: [
                    {
                        title: "Find first derivative",
                        body: "Use the chain rule (or quotient rule).",
                        equation: "$$f(x) = (x^2+1)^{-1}$$$$f'(x) = -(x^2+1)^{-2} \\cdot 2x = \\frac{-2x}{(x^2+1)^2}$$",
                        concept: "Chain rule with power of $-1$.",
                        mistake: "Don't forget the negative sign and the chain rule factor of $2x$.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative",
                        body: "Use quotient rule on $\\frac{-2x}{(x^2+1)^2}$.",
                        equation: "$$f''(x) = \\frac{(-2)(x^2+1)^2 - (-2x) \\cdot 2(x^2+1)(2x)}{(x^2+1)^4}$$$$f''(x) = \\frac{-2(x^2+1) + 8x^2}{(x^2+1)^3} = \\frac{6x^2 - 2}{(x^2+1)^3}$$",
                        concept: "Simplify by factoring out $(x^2+1)$ from numerator terms.",
                        mistake: "This is algebra-intensive. Take your time with the quotient rule.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for inflection points",
                        body: "Set numerator equal to zero.",
                        equation: "$$6x^2 - 2 = 0$$$$6x^2 = 2$$$$x^2 = \\frac{1}{3}$$$$x = \\pm\\frac{1}{\\sqrt{3}} \\approx \\pm 0.577$$",
                        concept: "Two inflection points by symmetry.",
                        mistake: "Denominator is always positive, so only check numerator.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify and evaluate",
                        body: "Check concavity and find coordinates.",
                        equation: "$$f''(0) = \\frac{-2}{1} < 0$$$$f''(1) = \\frac{6 - 2}{8} > 0$$$$f\\left(\\pm\\frac{1}{\\sqrt{3}}\\right) = \\frac{1}{\\frac{1}{3}+1} = \\frac{3}{4}$$",
                        concept: "Inflection points at $(\\pm \\frac{1}{\\sqrt{3}}, \\frac{3}{4})$.",
                        mistake: "Concavity changes from up to down to up.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection points at $\\left(\\pm\\frac{\\sqrt{3}}{3}, \\frac{3}{4}\\right)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            }
        ],
        hard: [
            {
                id: 'ip-hard-1',
                title: 'Fractional Exponent Function',
                problem: 'Find inflection points of $f(x) = x^{1/3}(x-1)$.',
                visual: {
                    type: 'function-graph',
                    description: 'Function with cusp and inflection point',
                    function: 'Math.pow(Math.abs(x), 1/3) * (x < 0 ? -1 : 1) * (x-1)',
                    xRange: [-2, 3],
                    yRange: [-2, 2],
                    inflectionPoints: [{x: 0.2, y: -0.464}]
                },
                steps: [
                    {
                        title: "Expand the function",
                        body: "Multiply out first.",
                        equation: "$$f(x) = x^{1/3}(x-1) = x^{4/3} - x^{1/3}$$",
                        concept: "When multiplying: $x^{1/3} \\cdot x = x^{1/3+1} = x^{4/3}$.",
                        mistake: "Be careful with fractional exponents: $\\frac{1}{3} + 1 = \\frac{4}{3}$.",
                        highlightElements: []
                    },
                    {
                        title: "Find first derivative",
                        body: "Use power rule with fractional exponents.",
                        equation: "$$f'(x) = \\frac{4}{3}x^{1/3} - \\frac{1}{3}x^{-2/3}$$",
                        concept: "Power rule works with any rational exponent.",
                        mistake: "Subtract 1 from each exponent: $\\frac{4}{3} - 1 = \\frac{1}{3}$ and $\\frac{1}{3} - 1 = -\\frac{2}{3}$.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative",
                        body: "Differentiate again.",
                        equation: "$$f''(x) = \\frac{4}{9}x^{-2/3} + \\frac{2}{9}x^{-5/3} = \\frac{1}{9}x^{-5/3}(4x + 2)$$",
                        concept: "$f''(x) = 0$ when $4x + 2 = 0$, so $x = -\\frac{1}{2}$. Also undefined at $x = 0$.",
                        mistake: "Both zero and undefined points are candidates.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Analyze candidates",
                        body: "Check concavity changes at $x = -1/2$ and $x = 0$.",
                        equation: "$$\\text{At } x = -\\frac{1}{2}: \\text{ concavity changes}$$$$\\text{At } x = 0: \\text{ cusp (not smooth), } f(0) = 0$$",
                        concept: "Inflection point at $x = -1/2$ (need to check if $f''$ changes sign). At $x=0$, the function has a cusp.",
                        mistake: "Inflection points require the point to be in the domain of $f$.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection point where $f''$ changes sign (verify by testing)",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-hard-2',
                title: 'Rational Function with Square Root',
                problem: 'Find intervals of concavity and inflection points for $f(x) = \\frac{x}{\\sqrt{x^2-1}}$.',
                visual: {
                    type: 'function-graph',
                    description: 'Rational function with restricted domain',
                    function: 'x/Math.sqrt(x*x-1)',
                    xRange: [-4, 4],
                    yRange: [-2, 2],
                    inflectionPoints: [],
                    asymptotes: [{x: -1, type: 'vertical'}, {x: 1, type: 'vertical'}]
                },
                steps: [
                    {
                        title: "Identify domain",
                        body: "Need $x^2 - 1 > 0$ (strictly, for square root in denominator).",
                        equation: "$$x^2 > 1$$$$x < -1 \\text{ or } x > 1$$",
                        concept: "Domain: $(-\\infty, -1) \\cup (1, \\infty)$. Two separate regions.",
                        mistake: "Cannot include $x = \\pm 1$ (denominator would be zero).",
                        highlightElements: []
                    },
                    {
                        title: "Find first derivative",
                        body: "Use quotient rule and chain rule.",
                        equation: "$$f'(x) = \\frac{(1)\\sqrt{x^2-1} - x \\cdot \\frac{x}{\\sqrt{x^2-1}}}{x^2-1}$$$$f'(x) = \\frac{x^2-1-x^2}{(x^2-1)^{3/2}} = \\frac{-1}{(x^2-1)^{3/2}}$$",
                        concept: "Interesting! The derivative is always negative (where defined).",
                        mistake: "The function is always decreasing on its domain.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative",
                        body: "Differentiate $f'(x) = -(x^2-1)^{-3/2}$.",
                        equation: "$$f''(x) = -\\left(-\\frac{3}{2}\\right)(x^2-1)^{-5/2} \\cdot 2x$$$$f''(x) = \\frac{3x}{(x^2-1)^{5/2}}$$",
                        concept: "The second derivative changes sign at $x = 0$, but $x = 0$ is NOT in the domain!",
                        mistake: "Inflection points must be in the domain of $f$.",
                        highlightElements: []
                    },
                    {
                        title: "Conclusion",
                        body: "Check concavity on each part of the domain.",
                        equation: "$$x < -1: f''(x) < 0 \\text{ (concave down)}$$$$x > 1: f''(x) > 0 \\text{ (concave up)}$$",
                        concept: "No inflection points! The function has two separate pieces with different concavity, but no point where concavity changes.",
                        mistake: "An inflection point requires the function to be continuous and concavity to change at that point.",
                        highlightElements: []
                    }
                ],
                answer: "**No inflection points**. Concave down on $(-\\infty, -1)$, concave up on $(1, \\infty)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6', asymptote: '#9ca3af' }
            },
            {
                id: 'ip-hard-3',
                title: 'Gaussian-type Function',
                problem: 'Find all inflection points of $f(x) = xe^{-x^2}$.',
                visual: {
                    type: 'function-graph',
                    description: 'Bell curve times x',
                    function: 'x*Math.exp(-x*x)',
                    xRange: [-2.5, 2.5],
                    yRange: [-0.5, 0.5],
                    inflectionPoints: [{x: -0.707, y: -0.303}, {x: 0.707, y: 0.303}]
                },
                steps: [
                    {
                        title: "Find first derivative (product rule)",
                        body: "For $f(x) = x \\cdot e^{-x^2}$.",
                        equation: "$$f'(x) = (1)e^{-x^2} + x(-2x)e^{-x^2}$$$$f'(x) = e^{-x^2}(1 - 2x^2)$$",
                        concept: "Product rule plus chain rule for the exponential.",
                        mistake: "Don't forget the chain rule: derivative of $-x^2$ is $-2x$.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative (product rule again)",
                        body: "Apply product rule to $f'(x) = e^{-x^2}(1-2x^2)$.",
                        equation: "$$f''(x) = (-2x)e^{-x^2}(1-2x^2) + e^{-x^2}(-4x)$$$$f''(x) = e^{-x^2}[-2x(1-2x^2) - 4x]$$$$f''(x) = e^{-x^2}[-2x + 4x^3 - 4x] = e^{-x^2} \\cdot 4x(x^2 - \\frac{3}{2})$$",
                        concept: "Factor out common terms to simplify.",
                        mistake: "Careful algebra! Combine like terms: $-2x - 4x = -6x$, then factor.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for inflection points",
                        body: "Since $e^{-x^2} > 0$ always, solve $x(x^2 - 3/2) = 0$.",
                        equation: "$$4x(x^2 - \\frac{3}{2}) = 0$$$$x = 0 \\text{ or } x^2 = \\frac{3}{2}$$$$x = 0, \\pm\\sqrt{\\frac{3}{2}} \\approx 0, \\pm 1.225$$",
                        concept: "Three candidates!",
                        mistake: "Check if $x = 0$ gives a concavity change.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity changes",
                        body: "Test the sign of $f''$ in each region. At $x=0$: $f''$ doesn't change sign (factor $x$ appears once). At $x = \\pm\\sqrt{3/2}$: concavity changes.",
                        equation: "$$f(\\sqrt{3/2}) \\approx 0.428, \\quad f(-\\sqrt{3/2}) \\approx -0.428$$",
                        concept: "Two inflection points (not three!).",
                        mistake: "$x = 0$ is a critical point, not an inflection point.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection points at $(\\pm\\sqrt{3/2}, \\text{values})$ or approximately $(\\pm 1.225, \\pm 0.428)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            },
            {
                id: 'ip-hard-4',
                title: 'Inverse Trigonometric Function',
                problem: 'Find inflection points of $f(x) = \\arctan(x)$.',
                visual: {
                    type: 'function-graph',
                    description: 'Arctangent function with S-curve',
                    function: 'Math.atan(x)',
                    xRange: [-5, 5],
                    yRange: [-2, 2],
                    inflectionPoints: [{x: 0, y: 0}]
                },
                steps: [
                    {
                        title: "Find first derivative",
                        body: "Use the standard derivative formula for arctangent.",
                        equation: "$$f(x) = \\arctan(x)$$$$f'(x) = \\frac{1}{1+x^2}$$",
                        concept: "This is a standard derivative you should memorize.",
                        mistake: "Don't confuse with $\\arcsin$ or other inverse trig functions.",
                        highlightElements: []
                    },
                    {
                        title: "Find second derivative",
                        body: "Differentiate $\\frac{1}{1+x^2} = (1+x^2)^{-1}$ using chain rule.",
                        equation: "$$f''(x) = -(1+x^2)^{-2} \\cdot 2x = \\frac{-2x}{(1+x^2)^2}$$",
                        concept: "Chain rule with power of $-1$.",
                        mistake: "Don't forget the negative sign and the $2x$ from the chain rule.",
                        highlightElements: []
                    },
                    {
                        title: "Solve for inflection points",
                        body: "Set $f''(x) = 0$.",
                        equation: "$$\\frac{-2x}{(1+x^2)^2} = 0$$$$-2x = 0$$$$x = 0$$",
                        concept: "Only one candidate: $x = 0$.",
                        mistake: "The denominator is never zero, so only check the numerator.",
                        highlightElements: ['inflectionX']
                    },
                    {
                        title: "Verify concavity change",
                        body: "Test concavity on both sides of $x = 0$.",
                        equation: "$$f''(-1) = \\frac{-2(-1)}{(2)^2} = \\frac{2}{4} > 0 \\quad \\text{(concave up)}$$$$f''(1) = \\frac{-2(1)}{(2)^2} = -\\frac{1}{2} < 0 \\quad \\text{(concave down)}$$$$f(0) = \\arctan(0) = 0$$",
                        concept: "Concavity changes from up to down at $x = 0$. Inflection point at the origin!",
                        mistake: "The arctangent function has that classic S-curve shape.",
                        highlightElements: ['inflectionPoint']
                    }
                ],
                answer: "Inflection point at $(0, 0)$",
                colors: { inflectionPoint: '#10b981', concavity: '#8b5cf6' }
            }
        ]
    },

    // --------------------------------------------------------
    // OPTIMIZATION
    // --------------------------------------------------------
    'optimization': {
        easy: [
            {
                id: 'opt-easy-1',
                title: 'Largest Rectangle in a Fixed Perimeter',
                problem: 'A farmer has 200 meters of fencing and wants to enclose a rectangular area. What dimensions maximize the enclosed area?',
                visual: {
                    type: 'function-graph',
                    function: '-(x - 50)^2 + 2500',
                    xRange: [0, 100],
                    yRange: [0, 2700],
                    description: 'Area as a function of width w',
                    criticalPoints: [{ x: 50, y: 2500, type: 'max' }]
                },
                steps: [
                    {
                        title: 'Set Up the Constraint',
                        body: 'Let w be the width and l be the length. The perimeter constraint gives us 2w + 2l = 200, so l = 100 - w.',
                        equation: '$2w + 2l = 200 \\Rightarrow l = 100 - w$',
                        concept: 'Optimization problems always have a quantity to maximize/minimize and a constraint that limits the variables.'
                    },
                    {
                        title: 'Write the Objective Function',
                        body: 'The area to maximize is A = w × l. Substitute the constraint to get A in terms of one variable.',
                        equation: '$A = w(100 - w) = 100w - w^2$',
                    },
                    {
                        title: 'Find the Critical Point',
                        body: 'Differentiate A with respect to w and set equal to zero.',
                        equation: "$A'(w) = 100 - 2w = 0 \\Rightarrow w = 50$",
                        concept: 'At a maximum, the derivative equals zero.'
                    },
                    {
                        title: 'Verify and Compute Dimensions',
                        body: 'Since A\'\'(w) = -2 < 0, w = 50 is a maximum. The length is l = 100 - 50 = 50.',
                        equation: '$w = 50 \\text{ m}, \\quad l = 50 \\text{ m}, \\quad A_{max} = 2500 \\text{ m}^2$',
                        concept: 'A square always maximizes area for a fixed perimeter.'
                    }
                ],
                answer: '50 m × 50 m (a square), giving a maximum area of 2500 m²',
                colors: { criticalPoint: '#ef4444' }
            },
            {
                id: 'opt-easy-2',
                title: 'Minimum Cost Box (Open Top)',
                problem: 'An open-top box with a square base must have a volume of 32 cubic feet. The base costs $4/ft² and the sides cost $2/ft². What dimensions minimize the total cost?',
                visual: {
                    type: 'function-graph',
                    function: '4*x^2 + 256/x',
                    xRange: [1, 7],
                    yRange: [0, 200],
                    description: 'Cost C as a function of base side length x',
                    criticalPoints: [{ x: 4, y: 96, type: 'min' }]
                },
                steps: [
                    {
                        title: 'Define Variables and Constraint',
                        body: 'Let x = side of the square base (ft), h = height (ft). Volume constraint: x²h = 32, so h = 32/x².',
                        equation: '$x^2 h = 32 \\Rightarrow h = \\dfrac{32}{x^2}$'
                    },
                    {
                        title: 'Write the Cost Function',
                        body: 'Base cost = 4 × x². Side cost = 2 × 4 × (x × h) = 8xh. Total cost C = 4x² + 8xh.',
                        equation: '$C = 4x^2 + 8x \\cdot \\dfrac{32}{x^2} = 4x^2 + \\dfrac{256}{x}$'
                    },
                    {
                        title: 'Minimize by Differentiating',
                        body: 'Set C\'(x) = 0 to find the critical point.',
                        equation: "$C'(x) = 8x - \\dfrac{256}{x^2} = 0 \\Rightarrow x^3 = 32 \\Rightarrow x = 4 \\text{ ft}$",
                        mistake: 'Don\'t forget to apply the quotient/power rule to the 256/x term.'
                    },
                    {
                        title: 'Find Height and Minimum Cost',
                        body: 'With x = 4: h = 32/16 = 2 ft. Minimum cost = 4(16) + 256/4 = 64 + 64 = $128.',
                        equation: '$x = 4 \\text{ ft}, \\quad h = 2 \\text{ ft}, \\quad C_{min} = \\$128$'
                    }
                ],
                answer: 'Base 4 ft × 4 ft, height 2 ft, minimum cost = $128',
                colors: { criticalPoint: '#3b82f6' }
            }
        ],
        medium: [
            {
                id: 'opt-medium-1',
                title: 'Shortest Distance from Point to Line',
                problem: 'Find the point on the line y = 2x + 1 closest to the point (3, 0). What is the minimum distance?',
                visual: {
                    type: 'function-graph',
                    function: '2*x + 1',
                    xRange: [-1, 4],
                    yRange: [-2, 6],
                    description: 'Line y = 2x + 1 with the closest point marked',
                    criticalPoints: [{ x: 1, y: 3, type: 'min' }]
                },
                steps: [
                    {
                        title: 'Write the Distance Formula',
                        body: 'The distance from point (x, 2x+1) on the line to (3, 0) is D = √[(x-3)² + (2x+1)²]. Minimize D² to simplify.',
                        equation: '$D^2 = (x-3)^2 + (2x+1)^2$'
                    },
                    {
                        title: 'Expand and Differentiate',
                        body: 'Expand D² = x² - 6x + 9 + 4x² + 4x + 1 = 5x² - 2x + 10. Take the derivative.',
                        equation: "$\\frac{d(D^2)}{dx} = 10x - 2 = 0 \\Rightarrow x = \\frac{1}{5}$"
                    },
                    {
                        title: 'Find the Closest Point',
                        body: 'At x = 1/5: y = 2(1/5) + 1 = 7/5. The closest point is (1/5, 7/5).',
                        equation: '$\\left(\\dfrac{1}{5},\\ \\dfrac{7}{5}\\right)$'
                    },
                    {
                        title: 'Compute Minimum Distance',
                        body: 'D = √[(1/5 - 3)² + (7/5)²] = √[(−14/5)² + (7/5)²] = √[196/25 + 49/25] = √(245/25) = 7/√5.',
                        equation: '$D_{min} = \\dfrac{7}{\\sqrt{5}} = \\dfrac{7\\sqrt{5}}{5} \\approx 3.13$'
                    }
                ],
                answer: '7√5 / 5 ≈ 3.13 units',
                colors: { criticalPoint: '#ef4444' }
            }
        ],
        hard: [
            {
                id: 'opt-hard-1',
                title: 'Optimal Cylinder in a Sphere',
                problem: 'A cylinder is inscribed in a sphere of radius R = 5. Find the dimensions of the cylinder with maximum volume.',
                visual: {
                    type: 'function-graph',
                    function: '2*3.14159*(25*x - x^3)',
                    xRange: [0, 5],
                    yRange: [0, 600],
                    description: 'Volume V as a function of cylinder radius r',
                    criticalPoints: [{ x: 3.33, y: 544, type: 'max' }]
                },
                steps: [
                    {
                        title: 'Set Up the Geometry',
                        body: 'Let r = cylinder radius, h = cylinder height. The cylinder fits inside a sphere of radius R = 5, so r² + (h/2)² = 25.',
                        equation: '$r^2 + \\dfrac{h^2}{4} = 25$'
                    },
                    {
                        title: 'Express Volume in One Variable',
                        body: 'V = πr²h. From the constraint, h = 2√(25 - r²). Substitute.',
                        equation: '$V(r) = \\pi r^2 \\cdot 2\\sqrt{25 - r^2} = 2\\pi r^2 \\sqrt{25 - r^2}$'
                    },
                    {
                        title: 'Differentiate and Set to Zero',
                        body: 'Using the product rule: V\'(r) = 2π[2r√(25-r²) + r²·(-r/√(25-r²))] = 0. Multiply through by √(25-r²).',
                        equation: "$4r(25 - r^2) - 2r^3 = 0 \\Rightarrow 100r - 6r^3 = 0 \\Rightarrow r^2 = \\dfrac{50}{3}$",
                        concept: 'Factor out r (r ≠ 0) to simplify the equation.'
                    },
                    {
                        title: 'Compute Dimensions and Maximum Volume',
                        body: 'r = √(50/3) = 5√(2/3). Then h = 2√(25 - 50/3) = 2√(25/3) = 10/√3.',
                        equation: '$r = 5\\sqrt{\\dfrac{2}{3}},\\quad h = \\dfrac{10}{\\sqrt{3}},\\quad V_{max} = \\dfrac{2000\\pi}{3\\sqrt{3}} \\approx 1209$ units³',
                        concept: 'The optimal cylinder has height h = r√2 inside any sphere.'
                    }
                ],
                answer: 'r = 5√(2/3) ≈ 4.08, h = 10/√3 ≈ 5.77, V_max = 2000π/(3√3) ≈ 1209 units³',
                colors: { criticalPoint: '#ef4444' }
            }
        ]
    },

    // --------------------------------------------------------
    // INTEGRATION
    // --------------------------------------------------------
    'integration': {
        easy: [
            {
                id: 'int-easy-1',
                title: 'Basic Polynomial Antiderivative',
                problem: 'Evaluate the indefinite integral: ∫(3x² + 2x − 5) dx',
                visual: {
                    type: 'function-graph',
                    function: '3*x^2 + 2*x - 5',
                    xRange: [-3, 3],
                    yRange: [-10, 25],
                    description: 'The integrand f(x) = 3x² + 2x − 5'
                },
                steps: [
                    {
                        title: 'Apply the Power Rule for Integration',
                        body: 'For each term xⁿ, the antiderivative is xⁿ⁺¹/(n+1). Apply term by term.',
                        equation: '$\\int x^n\\, dx = \\dfrac{x^{n+1}}{n+1} + C$',
                        concept: 'Integration is the reverse of differentiation. Always add the constant C.'
                    },
                    {
                        title: 'Integrate Each Term',
                        body: 'Integrate 3x²: result is x³. Integrate 2x: result is x². Integrate −5: result is −5x.',
                        equation: '$\\int 3x^2\\,dx = x^3, \\quad \\int 2x\\,dx = x^2, \\quad \\int -5\\,dx = -5x$'
                    },
                    {
                        title: 'Write the Final Answer',
                        body: 'Combine all terms and add the constant of integration C.',
                        equation: '$\\int(3x^2 + 2x - 5)\\,dx = x^3 + x^2 - 5x + C$',
                        mistake: 'Never forget + C for an indefinite integral — it represents a whole family of antiderivatives.'
                    }
                ],
                answer: 'x³ + x² − 5x + C',
                colors: {}
            },
            {
                id: 'int-easy-2',
                title: 'Definite Integral — Area Under a Curve',
                problem: 'Evaluate the definite integral: ∫₀³ (x² + 1) dx',
                visual: {
                    type: 'function-graph',
                    function: 'x^2 + 1',
                    xRange: [-1, 4],
                    yRange: [0, 12],
                    description: 'Area under f(x) = x² + 1 from x = 0 to x = 3'
                },
                steps: [
                    {
                        title: 'Find the Antiderivative',
                        body: 'The antiderivative of x² + 1 is x³/3 + x.',
                        equation: '$F(x) = \\dfrac{x^3}{3} + x$'
                    },
                    {
                        title: 'Apply the Fundamental Theorem of Calculus',
                        body: 'Evaluate F at the upper limit minus F at the lower limit.',
                        equation: '$\\int_0^3(x^2+1)\\,dx = F(3) - F(0) = \\left[\\dfrac{27}{3} + 3\\right] - [0] = 9 + 3 = 12$',
                        concept: 'The Fundamental Theorem connects differentiation and integration — a beautiful result!'
                    }
                ],
                answer: '12',
                colors: {}
            }
        ],
        medium: [
            {
                id: 'int-medium-1',
                title: 'U-Substitution',
                problem: 'Evaluate ∫ 2x·cos(x²) dx using substitution.',
                visual: {
                    type: 'function-graph',
                    function: '2*x*Math.cos(x**2)',
                    xRange: [-3, 3],
                    yRange: [-3, 3],
                    description: 'Integrand f(x) = 2x·cos(x²)'
                },
                steps: [
                    {
                        title: 'Identify the Substitution',
                        body: 'Notice that 2x is the derivative of x². Let u = x², so du = 2x dx.',
                        equation: '$u = x^2,\\quad du = 2x\\,dx$',
                        concept: 'Look for a function whose derivative appears as a factor in the integrand.'
                    },
                    {
                        title: 'Rewrite in Terms of u',
                        body: 'Replace x² with u and 2x dx with du.',
                        equation: '$\\int 2x\\cos(x^2)\\,dx = \\int \\cos(u)\\,du$'
                    },
                    {
                        title: 'Integrate and Back-Substitute',
                        body: '∫cos(u)du = sin(u) + C. Replace u with x².',
                        equation: '$= \\sin(u) + C = \\sin(x^2) + C$'
                    }
                ],
                answer: 'sin(x²) + C',
                colors: {}
            }
        ],
        hard: [
            {
                id: 'int-hard-1',
                title: 'Integration by Parts',
                problem: 'Evaluate ∫ x·eˣ dx',
                visual: {
                    type: 'function-graph',
                    function: 'x*Math.exp(x)',
                    xRange: [-3, 2],
                    yRange: [-2, 8],
                    description: 'Integrand f(x) = x·eˣ'
                },
                steps: [
                    {
                        title: 'Apply the Integration by Parts Formula',
                        body: 'Use ∫u dv = uv − ∫v du. Choose u = x (so du = dx) and dv = eˣ dx (so v = eˣ).',
                        equation: '$\\int u\\,dv = uv - \\int v\\,du$',
                        concept: 'LIATE rule: choose u as the function that appears first in Logarithm, Inverse trig, Algebraic, Trig, Exponential.'
                    },
                    {
                        title: 'Set Up with u = x and dv = eˣ dx',
                        body: 'With u = x and v = eˣ:',
                        equation: '$\\int x e^x\\,dx = x e^x - \\int e^x\\,dx$'
                    },
                    {
                        title: 'Evaluate the Remaining Integral',
                        body: '∫eˣ dx = eˣ. Combine and add C.',
                        equation: '$= x e^x - e^x + C = e^x(x - 1) + C$'
                    }
                ],
                answer: 'eˣ(x − 1) + C',
                colors: {}
            }
        ]
    },

    // --------------------------------------------------------
    // DERIVATIVES
    // --------------------------------------------------------
    'derivatives': {
        easy: [
            {
                id: 'der-easy-1',
                title: 'Product Rule',
                problem: 'Find the derivative of f(x) = x²·sin(x)',
                visual: {
                    type: 'function-graph',
                    function: 'x^2 * Math.sin(x)',
                    xRange: [-4, 4],
                    yRange: [-15, 15],
                    description: 'f(x) = x²·sin(x)'
                },
                steps: [
                    {
                        title: 'Identify the Product Rule',
                        body: 'f(x) = u·v where u = x² and v = sin(x). Use (uv)\' = u\'v + uv\'.',
                        equation: "$(uv)' = u'v + uv'$",
                        concept: 'Whenever two functions are multiplied together, use the product rule.'
                    },
                    {
                        title: 'Differentiate Each Factor',
                        body: 'u = x² → u\' = 2x. v = sin(x) → v\' = cos(x).',
                        equation: "$u' = 2x,\\quad v' = \\cos(x)$"
                    },
                    {
                        title: 'Apply the Product Rule',
                        body: 'Combine: f\'(x) = 2x·sin(x) + x²·cos(x).',
                        equation: "$f'(x) = 2x\\sin(x) + x^2\\cos(x)$"
                    }
                ],
                answer: "f'(x) = 2x·sin(x) + x²·cos(x)",
                colors: {}
            },
            {
                id: 'der-easy-2',
                title: 'Chain Rule Basics',
                problem: 'Find the derivative of f(x) = (3x + 1)⁵',
                visual: {
                    type: 'function-graph',
                    function: '(3*x + 1)^5',
                    xRange: [-1.5, 0.5],
                    yRange: [-10, 10],
                    description: 'f(x) = (3x + 1)⁵'
                },
                steps: [
                    {
                        title: 'Identify the Outer and Inner Functions',
                        body: 'Outer: u⁵ where u = 3x + 1 is the inner function.',
                        equation: '$f(x) = [g(x)]^5,\\quad g(x) = 3x+1$',
                        concept: 'The chain rule says: differentiate the outside, keep the inside, then multiply by the derivative of the inside.'
                    },
                    {
                        title: 'Apply the Chain Rule',
                        body: 'f\'(x) = 5(3x+1)⁴ · (3x+1)\'.',
                        equation: "$f'(x) = 5(3x+1)^4 \\cdot 3 = 15(3x+1)^4$"
                    }
                ],
                answer: "f'(x) = 15(3x + 1)⁴",
                colors: {}
            }
        ],
        medium: [
            {
                id: 'der-medium-1',
                title: 'Quotient Rule',
                problem: 'Find the derivative of f(x) = (x² + 1) / (x − 2)',
                visual: {
                    type: 'function-graph',
                    function: '(x^2 + 1)/(x - 2)',
                    xRange: [-2, 6],
                    yRange: [-20, 20],
                    description: 'f(x) = (x²+1)/(x−2)',
                    asymptotes: [{ type: 'vertical', x: 2 }]
                },
                steps: [
                    {
                        title: 'Identify the Quotient Rule',
                        body: 'f(x) = u/v where u = x²+1 and v = x−2. Rule: (u/v)\' = (u\'v − uv\')/v².',
                        equation: "$(u/v)' = \\dfrac{u'v - uv'}{v^2}$",
                        concept: '"Low d-High minus High d-Low, over Low squared" is a helpful mnemonic.'
                    },
                    {
                        title: 'Compute Derivatives of Numerator and Denominator',
                        body: 'u\' = 2x, v\' = 1.',
                        equation: "$u' = 2x,\\quad v' = 1$"
                    },
                    {
                        title: 'Apply the Formula',
                        body: 'Substitute into the quotient rule formula.',
                        equation: "$f'(x) = \\dfrac{2x(x-2) - (x^2+1)(1)}{(x-2)^2} = \\dfrac{2x^2 - 4x - x^2 - 1}{(x-2)^2} = \\dfrac{x^2 - 4x - 1}{(x-2)^2}$"
                    }
                ],
                answer: "f'(x) = (x² − 4x − 1) / (x − 2)²",
                colors: {}
            }
        ],
        hard: [
            {
                id: 'der-hard-1',
                title: 'Implicit Differentiation',
                problem: 'Find dy/dx for the curve x² + y² = 25 (a circle of radius 5). What is the slope at the point (3, 4)?',
                visual: {
                    type: 'function-graph',
                    function: 'Math.sqrt(25 - x^2)',
                    xRange: [-6, 6],
                    yRange: [-6, 6],
                    description: 'Upper semicircle x² + y² = 25',
                    criticalPoints: [{ x: 3, y: 4, type: 'max' }]
                },
                steps: [
                    {
                        title: 'Differentiate Both Sides Implicitly',
                        body: 'Differentiate x² + y² = 25 with respect to x. Remember y is a function of x, so d/dx(y²) = 2y·(dy/dx).',
                        equation: '$2x + 2y\\,\\dfrac{dy}{dx} = 0$',
                        concept: 'Implicit differentiation treats y as a function of x and uses the chain rule on y-terms.'
                    },
                    {
                        title: 'Solve for dy/dx',
                        body: 'Isolate dy/dx.',
                        equation: '$\\dfrac{dy}{dx} = -\\dfrac{x}{y}$'
                    },
                    {
                        title: 'Evaluate at the Given Point',
                        body: 'At (3, 4): dy/dx = −3/4.',
                        equation: '$\\dfrac{dy}{dx}\\Big|_{(3,4)} = -\\dfrac{3}{4}$'
                    }
                ],
                answer: 'dy/dx = −x/y; at (3,4) the slope is −3/4',
                colors: { criticalPoint: '#ef4444' }
            }
        ]
    },

    // --------------------------------------------------------
    // SERIES
    // --------------------------------------------------------
    'series': {
        easy: [
            {
                id: 'ser-easy-1',
                title: 'Geometric Series — Does It Converge?',
                problem: 'Determine if the series Σ (1/3)ⁿ from n=0 to ∞ converges, and if so, find its sum.',
                visual: {
                    type: 'function-graph',
                    function: 'Math.pow(1/3, x)',
                    xRange: [0, 8],
                    yRange: [0, 1.2],
                    description: 'Terms aₙ = (1/3)ⁿ approach 0 as n → ∞'
                },
                steps: [
                    {
                        title: 'Identify the Common Ratio',
                        body: 'This is a geometric series Σ arⁿ with a = 1 (first term when n=0) and r = 1/3.',
                        equation: '$\\sum_{n=0}^{\\infty} \\left(\\tfrac{1}{3}\\right)^n = \\sum_{n=0}^{\\infty} 1 \\cdot \\left(\\tfrac{1}{3}\\right)^n$'
                    },
                    {
                        title: 'Apply the Convergence Test',
                        body: 'A geometric series converges if and only if |r| < 1. Here |r| = 1/3 < 1, so the series converges.',
                        equation: '$|r| = \\tfrac{1}{3} < 1 \\Rightarrow \\text{converges}$',
                        concept: 'Geometric series is one of the few series where we can always find the exact sum.'
                    },
                    {
                        title: 'Compute the Sum',
                        body: 'Use the formula S = a / (1 − r).',
                        equation: '$S = \\dfrac{1}{1 - \\tfrac{1}{3}} = \\dfrac{1}{\\tfrac{2}{3}} = \\dfrac{3}{2}$'
                    }
                ],
                answer: 'The series converges to 3/2',
                colors: {}
            },
            {
                id: 'ser-easy-2',
                title: 'Telescoping Series',
                problem: 'Find the sum of Σ [1/n − 1/(n+1)] from n=1 to ∞.',
                visual: {
                    type: 'function-graph',
                    function: '1/x - 1/(x+1)',
                    xRange: [0.5, 10],
                    yRange: [0, 0.6],
                    description: 'Terms aₙ = 1/n − 1/(n+1) decreasing to 0'
                },
                steps: [
                    {
                        title: 'Write Out Partial Sums',
                        body: 'Write the first few terms of the partial sum Sₙ = (1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ...',
                        equation: '$S_n = 1 - \\dfrac{1}{n+1}$',
                        concept: 'In a telescoping series, most terms cancel, leaving only the first and last.'
                    },
                    {
                        title: 'Take the Limit',
                        body: 'As n → ∞, 1/(n+1) → 0.',
                        equation: '$S = \\lim_{n\\to\\infty} S_n = \\lim_{n\\to\\infty}\\left(1 - \\dfrac{1}{n+1}\\right) = 1$'
                    }
                ],
                answer: 'The sum is 1',
                colors: {}
            }
        ],
        medium: [
            {
                id: 'ser-medium-1',
                title: 'Ratio Test for Convergence',
                problem: 'Use the Ratio Test to determine if Σ n!/2ⁿ (from n=1 to ∞) converges or diverges.',
                visual: {
                    type: 'function-graph',
                    function: 'x/2',
                    xRange: [0, 10],
                    yRange: [0, 10],
                    description: 'The ratio aₙ₊₁/aₙ = (n+1)/2 grows without bound'
                },
                steps: [
                    {
                        title: 'Set Up the Ratio Test',
                        body: 'The Ratio Test computes L = lim |aₙ₊₁/aₙ|. If L > 1, the series diverges.',
                        equation: '$L = \\lim_{n\\to\\infty} \\left|\\dfrac{a_{n+1}}{a_n}\\right|$',
                        concept: 'The Ratio Test is especially useful when terms involve factorials or exponentials.'
                    },
                    {
                        title: 'Compute the Ratio',
                        body: 'aₙ = n!/2ⁿ, so aₙ₊₁ = (n+1)!/2ⁿ⁺¹.',
                        equation: '$\\dfrac{a_{n+1}}{a_n} = \\dfrac{(n+1)! / 2^{n+1}}{n! / 2^n} = \\dfrac{(n+1)}{2}$'
                    },
                    {
                        title: 'Evaluate the Limit',
                        body: 'As n → ∞, (n+1)/2 → ∞. Since L = ∞ > 1, the series diverges.',
                        equation: '$L = \\lim_{n\\to\\infty} \\dfrac{n+1}{2} = \\infty > 1 \\Rightarrow \\text{Diverges}$',
                        mistake: 'L = 1 is inconclusive — the Ratio Test fails in that case.'
                    }
                ],
                answer: 'The series diverges (L = ∞ by the Ratio Test)',
                colors: {}
            }
        ],
        hard: [
            {
                id: 'ser-hard-1',
                title: 'Taylor Series of eˣ at x = 0',
                problem: 'Find the Taylor series for f(x) = eˣ centered at x = 0, and write it in summation notation.',
                visual: {
                    type: 'function-graph',
                    function: 'Math.exp(x)',
                    xRange: [-2, 2],
                    yRange: [0, 8],
                    description: 'f(x) = eˣ and its polynomial approximations'
                },
                steps: [
                    {
                        title: 'Recall the Taylor Series Formula',
                        body: 'A Taylor series centered at 0 (Maclaurin series) is: f(x) = Σ f⁽ⁿ⁾(0)/n! · xⁿ.',
                        equation: '$f(x) = \\sum_{n=0}^{\\infty} \\dfrac{f^{(n)}(0)}{n!}\\, x^n$',
                        concept: 'For eˣ, every derivative is eˣ itself, making it the simplest Taylor series.'
                    },
                    {
                        title: 'Find the Derivatives at x = 0',
                        body: 'f(x) = eˣ, so f⁽ⁿ⁾(x) = eˣ for all n. Therefore f⁽ⁿ⁾(0) = e⁰ = 1.',
                        equation: '$f^{(n)}(0) = 1 \\text{ for all } n \\geq 0$'
                    },
                    {
                        title: 'Write the Series',
                        body: 'Plug in to get the Maclaurin series for eˣ.',
                        equation: '$e^x = \\sum_{n=0}^{\\infty} \\dfrac{x^n}{n!} = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots$',
                        concept: 'This series converges for all x ∈ ℝ — infinite radius of convergence!'
                    }
                ],
                answer: 'eˣ = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + ...',
                colors: {}
            }
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
