import { useState } from "react";
import { MiniTerminal } from "@code-hike/mini-terminal";
import "@code-hike/mini-terminal/dist/index.css";
import "@code-hike/mini-frame/dist/index.css";
import cx from "clsx";
import { useSpring } from 'use-spring'

export interface TerminalProps {
  title?: string;
  steps: Array<{ text: string; explanation: string }>;
  /** @default 0 */
  initial?: number;
  /** @default 200 */
  height?: number
}

export function Terminal(props: TerminalProps) {
  const { title, steps, initial = 0, height = 200 } = props;

  const [{ target, backward }, setProgress] = useState({ target: initial, backward: false });

  const [progress] = useSpring(target)

  function onNext() {
    if (target < steps.length - 1) {
      setProgress({ target: target + 1, backward: false });
    }
  }

  function onPrevious() {
    if (target > 0) {
      setProgress({ target: target - 1, backward: true });
    }
  }

  const hasPrevious = target > 0;
  const hasNext = target < steps.length - 1;

  const { explanation } = steps[target];

  const isSingleScreen = steps.length === 1

  return (
    <div className="not-prose flex flex-col my-12 gap-6">
      <div className="flex gap-6 justify-between">
        <div className="flex flex-col justify-center">
          <button
            disabled={!hasPrevious}
            onClick={onPrevious}
            aria-label="Previous step"
            className={cx(
              isSingleScreen && 'hidden',
              hasPrevious
                ? "text-gray-800 hover:text-green-600 transition-colors"
                : "text-gray-300 pointer-events-none"
            )}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </button>
        </div>
        <MiniTerminal
          progress={progress}
          /* @ts-expect-error Upstream types are wrong. */
          steps={steps}
          style={{ height, maxWidth:600 }}
          className="flex-1"
          title={title}
          backward={backward}
        />
        <div className="flex flex-col justify-center">
          <button
            disabled={!hasNext}
            onClick={onNext}
            aria-label="Next step"
            className={cx(
              isSingleScreen && 'hidden',
              hasNext
                ? "text-gray-800 hover:text-green-600 transition-colors"
                : "text-gray-300 pointer-events-none",
              ""
            )}
          >
            <svg
              aria-hidden
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>{explanation}</div>
    </div>
  );
}
