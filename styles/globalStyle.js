import { createGlobalStyle } from "styled-components";
import { Gray, FontSize, Weight, BorderRadius, Color } from "./variables";

export const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
  font-family: Rubik;
  font-size: 10px;
}

body {
  margin: 0;
  height: 100%;
}
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

* {
  box-sizing: border-box;
  background-repeat: no-repeat;

  &::after,
  &::before {
    box-sizing: border-box;
    background-repeat: no-repeat;
  }
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

input:focus {
  outline: none;
}

input[type="submit"] {
  cursor: pointer;
}

button {
  cursor: pointer;
  outline: none;
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 -24px;
}
[class*="Container--"] {
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 24px;
}
.Container--fullWidth {
  width: 100%;
}
.Container--medium {
  max-width: 768px;
}
.Container--small {
  max-width: 360px;
}


//vendor   rangeSlider

.rc-slider {
  position: relative;
  height: 14px;
  padding: 5px 0;
  width: 100%;
  border-radius: 6px;
  touch-action: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 20px 0 15px;
}
.rc-slider * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.rc-slider-rail {
  position: absolute;
  width: 100%;
  background-color: #e9e9e9;
  height: 4px;
  border-radius: 6px;
}
.rc-slider-track {
  position: absolute;
  left: 0;
  height: 4px;
  border-radius: 6px;
  background-color: #d71eae;
}
.rc-slider-handle {
  position: absolute;
  width: 14px;
  height: 14px;
  cursor: pointer;
  cursor: -webkit-grab;
  margin-top: -5px;
  cursor: grab;
  border-radius: 50%;
  border: solid 2px #d71eae;
  background-color: #fff;
  touch-action: pan-x;
}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
  border-color: #d71eae;
  box-shadow: 0 0 0 5px #d71eae;
}
.rc-slider-handle:focus {
  outline: none;
}
.rc-slider-handle-click-focused:focus {
  border-color: #d71eae;
  box-shadow: unset;
}
.rc-slider-handle:hover {
  border-color: #d71eae;
}
.rc-slider-handle:active {
  border-color: #d71eae;
  box-shadow: 0 0 5px #d71eae;
  cursor: -webkit-grabbing;
  cursor: grabbing;
}
.rc-slider-mark {
  position: absolute;
  top: 18px;
  left: 0;
  width: 100%;
  font-size: 12px;
}
.rc-slider-mark-text {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: #999;
}
.rc-slider-mark-text-active {
  color: #666;
}
.rc-slider-step {
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
}
.rc-slider-dot {
  position: absolute;
  bottom: -2px;
  margin-left: -4px;
  width: 8px;
  height: 8px;
  border: 2px solid #e9e9e9;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50%;
  vertical-align: middle;
}
.rc-slider-dot-active {
  border-color: #d71eae;
}
.rc-slider-dot-reverse {
  margin-right: -4px;
}
.rc-slider-disabled {
  background-color: #e9e9e9;
}
.rc-slider-disabled .rc-slider-track {
  background-color: #ccc;
}
.rc-slider-disabled .rc-slider-handle,
.rc-slider-disabled .rc-slider-dot {
  border-color: #ccc;
  box-shadow: none;
  background-color: #fff;
  cursor: not-allowed;
}
.rc-slider-disabled .rc-slider-mark-text,
.rc-slider-disabled .rc-slider-dot {
  cursor: not-allowed !important;
}
.rc-slider-vertical {
  width: 14px;
  height: 100%;
  padding: 0 5px;
}
.rc-slider-vertical .rc-slider-rail {
  height: 100%;
  width: 4px;
}
.rc-slider-vertical .rc-slider-track {
  left: 5px;
  bottom: 0;
  width: 4px;
}
.rc-slider-vertical .rc-slider-handle {
  margin-left: -5px;
  touch-action: pan-y;
}
.rc-slider-vertical .rc-slider-mark {
  top: 0;
  left: 18px;
  height: 100%;
}
.rc-slider-vertical .rc-slider-step {
  height: 100%;
  width: 4px;
}
.rc-slider-vertical .rc-slider-dot {
  left: 2px;
  margin-bottom: -4px;
}
.rc-slider-vertical .rc-slider-dot:first-child {
  margin-bottom: -4px;
}
.rc-slider-vertical .rc-slider-dot:last-child {
  margin-bottom: -4px;
}
.rc-slider-tooltip-zoom-down-enter,
.rc-slider-tooltip-zoom-down-appear {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  display: block !important;
  animation-play-state: paused;
}
.rc-slider-tooltip-zoom-down-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  display: block !important;
  animation-play-state: paused;
}
.rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active,
.rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active {
  animation-name: rcSliderTooltipZoomDownIn;
  animation-play-state: running;
}
.rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active {
  animation-name: rcSliderTooltipZoomDownOut;
  animation-play-state: running;
}
.rc-slider-tooltip-zoom-down-enter,
.rc-slider-tooltip-zoom-down-appear {
  transform: scale(0, 0);
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.rc-slider-tooltip-zoom-down-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
@keyframes rcSliderTooltipZoomDownIn {
  0% {
    opacity: 0;
    transform-origin: 50% 100%;
    transform: scale(0, 0);
  }
  100% {
    transform-origin: 50% 100%;
    transform: scale(1, 1);
  }
}
@keyframes rcSliderTooltipZoomDownOut {
  0% {
    transform-origin: 50% 100%;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform-origin: 50% 100%;
    transform: scale(0, 0);
  }
}
.rc-slider-tooltip {
  position: absolute;
  left: -9999px;
  top: -9999px;
  visibility: visible;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.rc-slider-tooltip * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.rc-slider-tooltip-hidden {
  display: none;
}
.rc-slider-tooltip-placement-top {
  padding: 4px 0 8px 0;
}
.rc-slider-tooltip-inner {
  padding: 6px 2px;
  min-width: 24px;
  height: 24px;
  font-size: 12px;
  line-height: 1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: #6c6c6c;
  border-radius: 6px;
  box-shadow: 0 0 4px #d9d9d9;
}
.rc-slider-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
  bottom: 4px;
  left: 50%;
  margin-left: -4px;
  border-width: 4px 4px 0;
  border-top-color: #6c6c6c;
}


//vendor reactTags
.react-tags-wrapper {
  position: relative;
}
.ReactTags__selected {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-height: 54px;
  padding: 10px 10px 0;
  border: 1px solid ${Gray.gray5};
  border-radius: ${BorderRadius.borderRadiusRegular};
}
.ReactTags__tag {
  display: block;
  background-color: ${Color.purple};
  height: 28px;
  border-radius: 14px;
  font-weight: ${Weight.fontWeightLight};
  font-size: ${FontSize.fontSizeBodyVerySmall};
  color: ${Color.white};
  line-height: 30px;
  padding: 0 10px;
  z-index: 5;
  margin: 0 6px 10px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.ReactTags__tagInput {
  flex-grow: 1;
}
.ReactTags__tagInputField {
  border: none !important;
  margin: 0 6px 10px !important;
  height: unset !important;
  padding: 0 !important;
}
.ReactTags__remove {
  background-color: transparent;
  color: ${Color.white};
  outline: none;
  border: none;
}


`;
