import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { AddProject } from "../components/AddProject";
import { useSelectedProjectValue } from "../context";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "DAILY",
        projectId: "1",
        userId: "112",
        dicId: "daily-tasks",
      },
      {
        name: "FUTURE",
        projectId: "2",
        userId: "112",
        dicId: "future-tasks",
      },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock("../hooks", () => ({
  useTasks: () => ({
    tasks: [
      {
        id: "BJu2xfJqAo7w4SnzVT8Z",
        archived: false,
        date: "03/30/2020",
        projectId: "1",
        task: "I need to do this now.",
        userId: "112",
      },
    ],
  }),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("I am resolved.")),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe("<AddProject />", () => {
  describe("Success", () => {
    it("renders <AddProject />", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
    });

    it("renders <AddProject /> and adds a project using onClick", async () => {
      const promise = Promise.resolve();
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project." },
      });
      expect(queryByTestId("project-name").value).toBe("Best project.");

      fireEvent.click(queryByTestId("add-project-submit"));
      await act(() => promise);
    });

    it("renders <AddProject /> and adds a project using onKeyDown", async () => {
      const promise = Promise.resolve();
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project." },
      });
      expect(queryByTestId("project-name").value).toBe("Best project.");

      fireEvent.keyDown(queryByTestId("add-project-submit"));
      await act(() => promise);
    });

    it("hides the project overlay when cancelled using onClick", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay when cancelled using onKeyDown", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using singular and reverse action using onClick", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using singular and reverse action using onKeyDown", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
  });
});
