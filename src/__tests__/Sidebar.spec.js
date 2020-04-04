import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/layout/Sidebar";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX"),
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: "THE OFFICE",
        projectId: "1",
        userId: "112",
        docId: "michael-scott",
      },
    ],
  })),
}));

beforeEach(cleanup);

describe("<Sidebar />", () => {
  describe("Success", () => {
    it("renders the sidebar component", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    it("changes the active project to Inbox in collated tasks using onClick", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("inbox-action"));
      fireEvent.keyDown(queryByTestId("inbox-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });

    it("changes the active project to Today in collated tasks using onClick", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("today-action"));
      fireEvent.keyDown(queryByTestId("today-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });

    it("changes the active project to Next_7 in collated tasks using onClick", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("next_7-action"));
      fireEvent.keyDown(queryByTestId("next_7-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeTruthy();
    });

    it("hides and shows the sidebar projects using onClick", () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(getByText("Projects"));
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.click(getByText("Projects"));
      expect(queryByText("Add Project")).toBeTruthy();
    });

    it("hides and shows the sidebar projects using onKeyDown", () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.keyDown(getByText("Projects"));
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.keyDown(getByText("Projects"));
      expect(queryByText("Add Project")).toBeTruthy();
    });
  });
});
