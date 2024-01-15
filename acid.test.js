// Assuming the style function is defined elsewhere and exported
const { style } = require('./style');

describe('style function', () => {
  it('correctly converts JSON to CSS', () => {
    const cssData = {
      ":root": [
        ["--max-width", "768px"]
      ],
      ".grid-container": [
        ["display", "grid"],
        ["grid-template-columns", { func: ["repeat", 2, "1fr"] }],
        ["gap", "10px"],
        {
          "@media screen and (max-width:768px)": {
            ".grid-item": [
              ["grid-template-columns", { func: ["repeat", 2, "1fr"] }]
            ]
          }
        }
      ],
      ".grid-item": [
        ["border", { func: ["1px", "solid", "#ccc"] }],
        ["padding", "10px"],
        ["textAlign", "center"],
        [
          "background",
          ["red", { func: ["linear-gradient", "to right", "red", "orange"] }]
        ],
        [
          "transform", [
            [{ func: ["rotate", "45deg"] }],
            [{ func: ["translateX", "100px"] }]
          ]
        ],
        [
          "filter",
          [{ func: ["blur", "5px"] }],
          [{ func: ["brightness", "0.8"] }]
        ],
        [
          "box-shadow", [
            ["10px", "10px", "5px", "0px", { func: ["rgba", 0, 0, 0, 0.75] }],
            ["inset", "0", "0", "10px", { func: ["rgba", 255, 255, 255, 0.5] }]
          ]
        ]
      ],
      ":hover": [
        ["background-color", "light-gray"]
      ]
    };

    const actualCss = style(cssData);
    const expectedCss = ":root{--max-width:768px;}.grid-container{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}@media screen and (max-width:768px){.grid-container .grid-item{grid-template-columns:repeat(2,1fr);}}.grid-item{border:1px(solid,#ccc);padding:10px;textAlign:center;background:red linear-gradient(to right,red,orange);transform:rotate(45deg) translateX(100px);filter:blur(5px) brightness(0.8);box-shadow:10px 10px 5px 0px rgba(0,0,0,0.75) inset 0 0 10px rgba(255,255,255,0.5);}:hover{background-color:light-gray;}";

    expect(actualCss).toBe(expectedCss);
  });
});
