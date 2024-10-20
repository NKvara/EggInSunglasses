import About from "@/features/desktop/apps/about";
import Browser from "@/features/desktop/apps/browser";
import Minesweeper from '@/features/desktop/apps/minesweeper/index';

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
    app: <Minesweeper />,
    init: {position: {x: 150, y: 150}},
    minSize: {w: 400, h: 400}
  },
  {
    icon: "/images/desktop/hampster.png",
    title: "Best Video",
    app: <Browser />,
    init: {position: {x: 800, y: 400}},
    minSize: {w: 800, h: 600}
  }
];
