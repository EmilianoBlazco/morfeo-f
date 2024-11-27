"use client";

import React from 'react';
import {FloatingAnimation} from "@components/self/animations/floating-animation";
import ErrorMessage from "@components/self/error/error-message";

const BadRequest = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-0">

            {/* Icon Section */}
            <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
                <div className="relative w-full max-w-md mx-auto">
                    <FloatingAnimation>
                        <svg className="h-72 w-50 relative" viewBox="0 0 778 530">
                            <g>
                                <path fill="#c0c0c0" d="M 694.5,333.5 C 683.226,355.167 668.226,374 649.5,390C 640.933,396.866 632.1,403.366 623,409.5C 622.5,438.498 622.333,467.498 622.5,496.5C 545.928,514.563 468.262,522.897 389.5,521.5C 330.057,522.019 271.057,517.185 212.5,507C 198.232,504.43 184.232,501.263 170.5,497.5C 170.433,478.827 170.767,460.16 171.5,441.5C 171.819,430.678 170.819,420.012 168.5,409.5C 153.332,399.838 139.166,388.838 126,376.5C 114.344,363.019 104.511,348.352 96.5,332.5C 90.1955,317.819 86.3622,302.486 85,286.5C 84.6667,245.833 84.3333,205.167 84,164.5C 80.711,153.677 78.211,142.677 76.5,131.5C 79.7559,110.578 91.7559,98.2449 112.5,94.5C 118.869,94.347 125.203,94.6803 131.5,95.5C 154.811,106.125 162.978,123.791 156,148.5C 152.667,154.5 149.333,160.5 146,166.5C 145.178,168.788 144.511,171.122 144,173.5C 143.333,206.5 143.333,239.5 144,272.5C 144.238,283.833 146.238,294.833 150,305.5C 155.83,316.497 162.163,327.164 169,337.5C 170.173,306.514 170.84,275.514 171,244.5C 176.381,184.744 200.714,134.411 244,93.5C 242.264,66.1411 240.264,38.8078 238,11.5C 258.208,26.595 278.875,40.9283 300,54.5C 316.578,48.5296 333.412,43.363 350.5,39C 399.305,29.3602 446.305,34.8602 491.5,55.5C 512.774,41.5575 533.774,27.2242 554.5,12.5C 554.833,13 555.167,13.5 555.5,14C 552.586,40.1307 550.42,66.2974 549,92.5C 591.777,133.725 616.11,184.059 622,243.5C 622.333,266.167 622.667,288.833 623,311.5C 623.383,318.86 624.05,326.193 625,333.5C 631.834,323.325 637.834,312.659 643,301.5C 646.481,291.802 648.481,281.802 649,271.5C 649.667,236.833 649.667,202.167 649,167.5C 631.627,148.764 629.96,128.764 644,107.5C 659.98,92.039 677.814,89.539 697.5,100C 709.371,107.574 715.705,118.407 716.5,132.5C 714.932,143.042 712.432,153.375 709,163.5C 708.847,204.511 708.18,245.511 707,286.5C 705.17,302.821 701.004,318.488 694.5,333.5 Z"/>
                            </g>
                            <g>
                                <path fill="#f0f0f0" d="M 112.5,94.5 C 114.978,93.8359 117.645,93.5025 120.5,93.5C 124.469,93.2942 128.135,93.9608 131.5,95.5C 125.203,94.6803 118.869,94.347 112.5,94.5 Z"/>
                            </g>
                            <g>
                                <path fill="#b3b3b3" d="M 471.5,163.5 C 494.085,162.046 511.918,170.38 525,188.5C 535.227,206.673 534.893,224.673 524,242.5C 519.972,250.695 513.805,256.695 505.5,260.5C 475.496,273.474 450.996,266.807 432,240.5C 418.441,212.995 423.941,190.162 448.5,172C 455.88,168.044 463.547,165.211 471.5,163.5 Z"/>
                            </g>
                            <g>
                                <path fill="#b3b3b3" d="M 304.5,164.5 C 327.085,163.046 344.918,171.38 358,189.5C 368.227,207.673 367.893,225.673 357,243.5C 352.972,251.695 346.805,257.695 338.5,261.5C 308.496,274.474 283.996,267.807 265,241.5C 251.441,213.995 256.941,191.162 281.5,173C 288.88,169.044 296.547,166.211 304.5,164.5 Z"/>
                            </g>
                            <g>
                                <path fill="#ffffff" d="M 471.5,168.5 C 492.477,166.909 508.977,174.576 521,191.5C 533.921,220.818 526.088,242.651 497.5,257C 473.882,264.64 454.049,259.14 438,240.5C 430.821,229.186 428.488,216.852 431,203.5C 437.864,184.135 451.364,172.469 471.5,168.5 Z"/>
                            </g>
                            <g>
                                <path fill="#ffffff" d="M 304.5,169.5 C 325.477,167.909 341.977,175.576 354,192.5C 366.921,221.818 359.088,243.651 330.5,258C 306.882,265.64 287.049,260.14 271,241.5C 263.821,230.186 261.488,217.852 264,204.5C 270.864,185.135 284.364,173.469 304.5,169.5 Z"/>
                            </g>
                            <g>
                                <path fill="#404040" d="M 307.5,178.5 C 316.916,177.621 323.749,181.288 328,189.5C 328.833,203.333 322.333,209.833 308.5,209C 296.964,204.76 293.464,196.927 298,185.5C 300.79,182.535 303.957,180.202 307.5,178.5 Z"/>
                            </g>
                            <g>
                                <path fill="#404040" d="M 475.5,178.5 C 484.916,177.621 491.749,181.288 496,189.5C 496.833,203.333 490.333,209.833 476.5,209C 464.964,204.76 461.464,196.927 466,185.5C 468.79,182.535 471.957,180.202 475.5,178.5 Z"/>
                            </g>
                            <g>
                                <path fill="#a6a6a6" d="M 389.5,293.5 C 396.745,293.013 403.745,293.847 410.5,296C 430.652,308.792 436.152,326.292 427,348.5C 418.481,362.574 405.981,368.407 389.5,366C 369.706,359.85 360.539,346.35 362,325.5C 364.935,309.197 374.102,298.53 389.5,293.5 Z"/>
                            </g>
                            <g>
                                <path fill="#999999" d="M 416.5,339.5 C 403.17,339.529 389.837,339.529 376.5,339.5C 373.004,314.827 383.337,305.327 407.5,311C 411.49,312.99 413.99,316.157 415,320.5C 416.107,326.787 416.607,333.12 416.5,339.5 Z"/>
                            </g>
                            <g>
                                <path fill="#e6e6e6" d="M 96.5,332.5 C 104.511,348.352 114.344,363.019 126,376.5C 139.166,388.838 153.332,399.838 168.5,409.5C 170.819,420.012 171.819,430.678 171.5,441.5C 170.767,460.16 170.433,478.827 170.5,497.5C 138.249,490.694 107.249,480.194 77.5,466C 61.3197,457.826 46.8197,447.326 34,434.5C 17.3758,416.246 16.3758,397.246 31,377.5C 36.5313,371.634 42.3647,366.134 48.5,361C 64.3982,351.222 80.3982,341.722 96.5,332.5 Z"/>
                            </g>
                            <g>
                                <path fill="#e6e6e6" d="M 694.5,333.5 C 695.292,335.257 696.625,336.591 698.5,337.5C 715.285,344.791 730.952,353.958 745.5,365C 754.288,372.777 761.121,381.944 766,392.5C 767.455,399.444 767.788,406.444 767,413.5C 756.888,433.946 741.721,449.446 721.5,460C 690.252,476.806 657.252,488.973 622.5,496.5C 622.333,467.498 622.5,438.498 623,409.5C 632.1,403.366 640.933,396.866 649.5,390C 668.226,374 683.226,355.167 694.5,333.5 Z"/>
                            </g>
                            <g>
                                <path fill="#d9d9d9" d="M 376.5,339.5 C 389.837,339.529 403.17,339.529 416.5,339.5C 416.672,340.492 416.338,341.158 415.5,341.5C 402.656,341.171 389.989,341.505 377.5,342.5C 376.596,341.791 376.263,340.791 376.5,339.5 Z"/>
                            </g>
                            <g>
                                <path fill="#f2f2f2" d="M 415.5,341.5 C 408.947,351.104 399.947,354.604 388.5,352C 384.641,348.968 380.974,345.802 377.5,342.5C 389.989,341.505 402.656,341.171 415.5,341.5 Z"/>
                            </g>
                            <g>
                                <path fill="#ffffff" d="M -0.5,527.5 C 259.167,527.5 518.833,527.5 778.5,527.5C 778.5,528.5 778.5,529.5 778.5,530.5C 518.833,530.5 259.167,530.5 -0.5,530.5C -0.5,529.5 -0.5,528.5 -0.5,527.5 Z"/>
                            </g>
                        </svg>
                        <div className="rounded-xl absolute left-1/2 transform -translate-x-1/2 rotate-[-9deg] bg-gray-200 text-gray-700 px-4 py-2 text-lg font-bold whitespace-nowrap top-[10%] line-through">
                            https://www.morfeo-sa.com/bad-request
                        </div>
                    </FloatingAnimation>
                </div>
            </div>

            {/* Access Denied Text Section */}
            <ErrorMessage
                errorCode="400"
                errorTitle="Solicitud Incorrecta"
                errorMessage="Parece que hubo un problema con la solicitud. Por favor, verifique y vuelva a intentarlo."
                buttonText="Volver al inicio"
                buttonLink="/"
            />
        </div>
    );
};

export default BadRequest;