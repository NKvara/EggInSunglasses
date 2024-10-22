import Cell from "@/features/desktop/apps/minesweeper/cell";
import {useEffect, useState} from "react";

export default function Minesweeper() {
  const [settings] = useState({mines: 100, rows: 30, cols: 24});
  const [realBoard, setRealBoard] = useState([[""]]);

  const [land, setLand] = useState([[""]]);

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  const generate = () => {
    // create boards
    setLand(
      Array(settings.rows)
        .fill(null)
        .map(() => Array(settings.cols).fill(""))
    );
    const board = Array(settings.rows)
      .fill(null)
      .map(() => Array(settings.cols).fill("c"));

    //place mines
    const pairs: number[][] = [];
    for (let i = 0; i < settings.mines; i++) {
      const mine = [
        Math.floor(Math.random() * settings.rows),
        Math.floor(Math.random() * settings.cols)
      ];
      if (board[mine[0]][mine[1]] === "b") {
        i--;
        continue;
      }
      board[mine[0]][mine[1]] = "b";
      pairs.push([mine[0], mine[1]]);
    }

    //get number positions
    for (let i = 0; i < pairs.length; i++) {
      directions.forEach((e) => {
        const ri = pairs[i][0] + e[0];
        const ci = pairs[i][1] + e[1];
        if (
          ri !== -1 &&
          ci !== -1 &&
          ri !== board.length &&
          ci !== board[0].length &&
          board[ri][ci] === "c"
        ) {
          board[ri][ci] = "n";
        }
      });
    }

    // give numbers numbers
    while (board.some((innerArray) => innerArray.includes("n"))) {
      const rowIndex = board.findIndex((innerArray) =>
        innerArray.includes("n")
      );
      if (rowIndex !== -1) {
        const colIndex = board[rowIndex].indexOf("n");
        let bombAmout = 0;
        directions.forEach((e) => {
          const ri = rowIndex + e[0];
          const ci = colIndex + e[1];
          if (
            ri !== -1 &&
            ci !== -1 &&
            ri !== board.length &&
            ci !== board[0].length &&
            board[ri][ci] === "b"
          ) {
            bombAmout++;
          }
        });
        board[rowIndex][colIndex] = bombAmout.toString();
      }
    }

    setRealBoard(board);
  };

  const flag = ({i, j}: {i: number; j: number}) => {
    if (land[i][j] !== "" && land[i][j] !== "f") {
      return null;
    }
    const newArr = [...land];
    newArr[i][j] = land[i][j] === "" ? "f" : "";
    setLand(newArr);
  };

  const updateArray = ({i, j}: {i: number; j: number}) => {
    if (land[i][j] !== "") {
      return null;
    }

    const newArr = [...land];
    newArr[i][j] = realBoard[i][j];

    if (newArr[i][j] === "b") {
      alert("you are done for");
    } else if (newArr[i][j] === "c") {
      while (newArr.some((innerArray) => innerArray.includes("c"))) {
        const rowIndex = newArr.findIndex((innerArray) =>
          innerArray.includes("c")
        );
        if (rowIndex !== -1) {
          const colIndex = newArr[rowIndex].indexOf("c");
          directions.forEach((e) => {
            const ri = rowIndex + e[0];
            const ci = colIndex + e[1];
            if (
              ri !== -1 &&
              ci !== -1 &&
              ri !== newArr.length &&
              ci !== newArr[0].length &&
              realBoard[ri][ci] !== "b" &&
              newArr[ri][ci] === ""
            ) {
              newArr[ri][ci] = realBoard[ri][ci];
            }
          });
          newArr[rowIndex][colIndex] = "e";
        }
      }
    }
    setLand(newArr);
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center w-full h-full bg-EWhite overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="h-8">
          {settings.mines - land.flat().filter((item) => item === "f").length}
        </div>
        <div className="flex flex-wrap bg-black max-w-xl w-full">
          {land.map((o, i) => (
            <div key={"row-" + i}>
              {o.map((e, j) => (
                <div
                  className={`bg-slate-300 aspect-square`}
                  style={{width: `${572 / settings.rows}px`}}
                  key={"land-" + i + j}
                  onClick={() => {
                    updateArray({i, j});
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    flag({i, j});
                  }}
                >
                  <Cell type={e} number={(i + j) % 2} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
