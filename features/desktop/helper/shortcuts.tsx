import About from "@/features/desktop/apps/about";
import Browser from "@/features/desktop/apps/browser";
import Minesweeper from '@/features/desktop/apps/minesweeper/index';

export const shortcuts = [
  {
    icon: "/images/desktop/web.png",
    title: "About This Developer",
    app: <About />,
    init: {position: {x: 200, y: 200}},
    minSize: {w: 600, h: 440}
  },
  {
    icon: "/images/desktop/web.png",
    title: "minesweeper",
    app: <Minesweeper />,
    init: {position: {x: 150, y: 150}},
    minSize: {w: 576, h: 540}
  },
  {
    icon: "/images/desktop/hampster.png",
    title: "Best Video",
    app: <Browser />,
    init: {position: {x: 100, y: 100}},
    minSize: {w: 800, h: 600}
  }
];
