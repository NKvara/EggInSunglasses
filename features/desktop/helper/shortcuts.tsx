import About from "@/features/desktop/apps/about";

export const shortcuts = [
  {
    icon: "/images/desktop/web.png",
    title: "about",
    app: <About />,
    init: {position: {x: 200, y: 200}},
    minSize: {w: 400, h: 600}
  },
  {
    icon: "/images/desktop/web.png",
    title: "minesweeper",
    app: <div />,
    init: {position: {x: 150, y: 150}},
    minSize: {w: 400, h: 400}
  }
];
