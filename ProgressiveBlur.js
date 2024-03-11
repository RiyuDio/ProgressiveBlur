document.addEventListener('DOMContentLoaded', function() {
    var parentElements = document.querySelectorAll('[ProgressiveBlur="parent"]');
    parentElements.forEach(function(parentElement) {
        var insetValue = '0';
        var progressiveColor = parentElement.getAttribute('ProgressiveColor') || '#FFFFFF';

        if (progressiveColor.toLowerCase() === 'invisible') {
            // If ProgressiveColor is set to "invisible", do not add the additionalDiv
            var addAdditionalDiv = false;
        } else {
            var addAdditionalDiv = true;
            // Convert hex color to RGB
            var red = parseInt(progressiveColor.substring(1, 3), 16);
            var green = parseInt(progressiveColor.substring(3, 5), 16);
            var blue = parseInt(progressiveColor.substring(5, 7), 16);
        }

        Object.assign(parentElement.style, {
            zIndex: 5,
            inset: insetValue, 
            position: 'relative',
            pointerEvents: 'none'
        });

        var direction = parentElement.getAttribute('ProgressiveDirection') || 'down';

        var blurValues = [0.5, 1, 2, 4, 8, 16, 32];
        var maskPercentages = [
            [0, 12.5, 25, 37.5],
            [12.5, 25, 37.5, 50],
            [25, 37.5, 50, 62.5],
            [37.5, 50, 62.5, 75],
            [50, 62.5, 75, 87.5],
            [62.5, 75, 87.5, 100]
        ];

        // Adjust mask percentages based on direction
        if (direction === 'up') {
            maskPercentages.reverse();
            insetValue = '-10% 0 0 0'; // Adjust inset for up direction
        } else if (direction === 'down') {
            insetValue = '0 0 -10% 0'; // Adjust inset for down direction
        }

        // Create and append the required number of divs
        for (var i = 0; i < 6; i++) {
            var div = document.createElement('div');
            Object.assign(div.style, {
                position: 'absolute',
                inset: insetValue, // Apply the inset value based on direction
                zIndex: i + 2,
                backdropFilter: 'blur(' + blurValues[i] + 'px)',
            });

            // Add mask only if not using Safari
            if (!isSafari()) {
                div.style.maskImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${maskPercentages[i][0]}%, rgba(0, 0, 0, 1) ${maskPercentages[i][1]}%, rgba(0, 0, 0, 1) ${maskPercentages[i][2]}%, rgba(0, 0, 0, 0) ${maskPercentages[i][3]}%)`;
            } else {
                div.style.webkitMaskImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${maskPercentages[i][0]}%, rgba(0, 0, 0, 1) ${maskPercentages[i][1]}%, rgba(0, 0, 0, 1) ${maskPercentages[i][2]}%, rgba(0, 0, 0, 0) ${maskPercentages[i][3]}%)`;
                div.style.webkitBackdropFilter = 'blur(' + blurValues[i] + 'px)';
            }
            parentElement.appendChild(div);
        }

        // Trigger repaint after a delay
        setTimeout(function() {
            parentElement.style.display = "table";
            parentElement.offsetHeight;
            parentElement.style.display = "block";
        }, 100); // Adjust the delay as needed

        // Add ::before and ::after pseudo-elements via CSS
        var styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            .gradient-blur::before, .gradient-blur::after {
                position: absolute;
                inset: 0;
                content: '';
                z-index: 1;
            }
            .gradient-blur::before {
                display: none; /* Remove blur from parent */
            }
            .gradient-blur::after {
                z-index: 8;
                backdrop-filter: blur(64px);
                -webkit-backdrop-filter: blur(64px);
                mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(${red}, ${green}, ${blue}, 1) 100%);
                -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(${red}, ${green}, ${blue}, 1) 100%);
            }
        `;
        document.head.appendChild(styleSheet);

        // Add an additional div with linear gradient only if not invisible
        if (addAdditionalDiv) {
            var additionalDiv = document.createElement('div');
            var gradientColors = direction === 'up' ? `rgb(${red}, ${green}, ${blue}, 100) 20%, rgba(${red}, ${green}, ${blue}, 0) 30%, rgba(${red}, ${green}, ${blue}, 0)` : `rgba(${red}, ${green}, ${blue}, 0) 10%, rgba(${red}, ${green}, ${blue}, 0) 90%, rgba(${red}, ${green}, ${blue}, 100) 80%`;
            Object.assign(additionalDiv.style, {
                position: 'absolute',
                inset: '0', 
                zIndex: 1, 
                backgroundImage: `linear-gradient(${gradientColors})`
            });
            parentElement.appendChild(additionalDiv);
        }
    });
});

// Function to check if the browser is Safari
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}