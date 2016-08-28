/**
 * Created by wangsheng on 28/8/16.
 */

export function ToolTipDirective() {

    let tooltipContainer = document.getElementById("tooltipContainer");
    let tooltipInner = tooltipContainer.querySelector(".tooltip-inner");

    return {
        restrict: 'A',
        link: function postLink(scope, element, attributes) {
            element.on('mouseover', function () {
                let ebbox = element[0].getBoundingClientRect();
                let eTop = ebbox.top;
                let eWidthCenter = ebbox.left + ebbox.width / 2;

                tooltipInner.textContent = attributes['wsToolTip'];
                tooltipContainer.style.top = eTop;
                tooltipContainer.style.left = eWidthCenter;
                tooltipContainer.style.transform = "translate(-50%, -100%)";

                tooltipContainer.style.display = "block";
            });

            element.on("mouseout", function () {
                tooltipContainer.style.display = "none";
            })
        },
    };
}