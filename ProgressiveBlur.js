document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[ProgressiveBlur="parent"]').forEach(function (e) {
        var r = "0";
        var t = e.getAttribute("ProgressiveColor") || "#FFFFFF";
        var a = true, i = 255, $ = 255, n = 255;

        if (t.toLowerCase() === "invisible") {
            a = false;
        } else {
            i = parseInt(t.substring(1, 3), 16);
            $ = parseInt(t.substring(3, 5), 16);
            n = parseInt(t.substring(5, 7), 16);
        }

        Object.assign(e.style, {
            zIndex: 5,
            inset: r,
            position: "relative",
            pointerEvents: "none"
        });

        var o = e.getAttribute("ProgressiveDirection") || "down";
        var s = [.5, 1, 2, 4, 8, 16, 32];
        var b = [[0, 12.5, 25, 37.5], [12.5, 25, 37.5, 50], [25, 37.5, 50, 62.5], [37.5, 50, 62.5, 75], [50, 62.5, 75, 87.5], [62.5, 75, 87.5, 100]];
        var direction = "to bottom";
        var maskInset = "0 0 -10% 0";

        if (o === "up") {
            b.reverse();
            direction = "to bottom";
            maskInset = "-10% 0 0 0";
        } else if (o === "down") {
            direction = "to bottom";
            maskInset = "0 0 -10% 0";
        } else if (o === "left") {
            b.reverse();
            direction = "to right";
            maskInset = "0 -10% 0 0";
        } else if (o === "right") {
            direction = "to right";
            maskInset = "0 0 0 -10%";
        }

        for (var l = 0; l < 6; l++) {
            var g = document.createElement("div");
            Object.assign(g.style, {
                position: "absolute",
                inset: maskInset,
                zIndex: l + 2,
                backdropFilter: "blur(" + s[l] + "px)"
            });

            var grad = `linear-gradient(${direction}, rgba(0, 0, 0, 0) ${b[l][0]}%, rgba(0, 0, 0, 1) ${b[l][1]}%, rgba(0, 0, 0, 1) ${b[l][2]}%, rgba(0, 0, 0, 0) ${b[l][3]}%)`;

            if (isSafari()) {
                g.style.webkitMaskImage = grad;
                g.style.webkitBackdropFilter = "blur(" + s[l] + "px)";
            } else {
                g.style.maskImage = grad;
            }

            e.appendChild(g);
        }

        setTimeout(function () {
            e.style.display = "table";
            e.offsetHeight;
            e.style.display = "block";
        }, 100);

        var d = document.createElement("style");
        d.type = "text/css";
        d.innerText = `
            .gradient-blur::before, .gradient-blur::after {
                position: absolute;
                inset: 0;
                content: '';
                z-index: 1;
            }
            .gradient-blur::before {
                display: none;
            }
            .gradient-blur::after {
                z-index: 8;
                backdrop-filter: blur(64px);
                -webkit-backdrop-filter: blur(64px);
                mask-image: linear-gradient(${direction}, rgba(0, 0, 0, 0) 87.5%, rgba(${i}, ${$}, ${n}, 1) 100%);
                -webkit-mask-image: linear-gradient(${direction}, rgba(0, 0, 0, 0) 87.5%, rgba(${i}, ${$}, ${n}, 1) 100%);
            }
        `;
        document.head.appendChild(d);

        if (a) {
            var u = document.createElement("div");
            var fillDirection = direction;
            var _ =
                o === "up" || o === "left"
                    ? `rgb(${i}, ${$}, ${n}, 100) 20%, rgba(${i}, ${$}, ${n}, 0) 30%, rgba(${i}, ${$}, ${n}, 0)`
                    : `rgba(${i}, ${$}, ${n}, 0) 10%, rgba(${i}, ${$}, ${n}, 0) 90%, rgba(${i}, ${$}, ${n}, 100) 80%`;

            Object.assign(u.style, {
                position: "absolute",
                inset: "0",
                zIndex: 1,
                backgroundImage: `linear-gradient(${fillDirection}, ${_})`
            });
            e.appendChild(u);
        }
    });
});

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
