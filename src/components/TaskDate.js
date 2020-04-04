import React from "react";
import moment from "moment";
import { FaSpaceShuttle, FaSun, FaPaperPlane } from "react-icons/fa";

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            tabIndex={0}
            role="button"
            aria-label="Select today as the task date"
            data-testid="task-date-today"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format("MM/DD/YYYY"));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format("MM/DD/YYYY"));
            }}
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            tabIndex={0}
            role="button"
            aria-label="Select tomorrow as the task date"
            data-testid="task-date-tomorrow"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(
                moment()
                  .add(1, "day")
                  .format("MM/DD/YYYY")
              );
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(
                moment()
                  .add(1, "day")
                  .format("MM/DD/YYYY")
              );
            }}
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            tabIndex={0}
            role="button"
            aria-label="Select next week as the task date"
            data-testid="task-date-next-week"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(
                moment()
                  .add(7, "days")
                  .format("MM/DD/YYYY")
              );
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(
                moment()
                  .add(7, "days")
                  .format("MM/DD/YYYY")
              );
            }}
          >
            <span>
              <FaPaperPlane />
            </span>
            <span>Next Week</span>
          </div>
        </li>
      </ul>
    </div>
  );
