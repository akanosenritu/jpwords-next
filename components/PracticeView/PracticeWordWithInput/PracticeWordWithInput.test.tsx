import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {PracticeWordWithInput} from "./PracticeWordWithInput";
import '@testing-library/jest-dom'

import {Word} from "../../../types/Word";

export const wordTypeExamples: Word[] = [
  {
    uuid: "6a9b3e61-1eeb-47a2-82ce-31879476770f",
    kanji: "例",
    kana: "れい",
    category: ["n"],
    meaning: {
      ENG: "example"
    }
  },
  {
    uuid: "22d662b7-98a9-4ef6-b8b7-1763d33f2e2d",
    kanji: "意味",
    kana: "いみ",
    category: ["n-vs"],
    meaning: {
      ENG: "meaning"
    }
  },
  {
    uuid: "8e41dff0-81ca-4e70-b2dd-9116b8679642",
    meaning: {
      ENG: "ten"
    },
    kana: "じゅう",
    kanji: "十",
    category: ["num"]
  },
  {
    uuid: "6a45ac20-d511-4931-9c75-eabd682a5ef5",
    meaning: {
      ENG: "counter for occurrences"
    },
    kana: "～ど",
    kanji: "～度",
    category: ["n-suf"]
  },
]


describe("test inputs2", () => {
  test.each(wordTypeExamples)("no answer, enter pressed once", (word: Word) => {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    const parentElement = screen.getByRole("textbox").parentElement;
    if (!parentElement) throw new Error("the parent of the input is null.")
    expect(parentElement).toHaveStyle(`background-color: #fffaf2`)
    expect(mockOnNext.mock.calls.length).toBe(0);
  })

  test.each(wordTypeExamples)("no answer, enter pressed twice", (word: Word) => {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    const parentElement = screen.getByRole("textbox").parentElement;
    if (!parentElement) throw new Error("the parent of the input is null.")
    expect(parentElement).toHaveStyle(`background-color: #fffaf2`)
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(mockOnNext.mock.calls.length).toBe(1);
    expect(mockOnNext.mock.calls[0][0]).toBe(false);
  })

  test.each(wordTypeExamples)("wrong answer input, enter pressed once, answer correctly, enter pressed.", (word: Word) => {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    userEvent.type(screen.getByRole("textbox"), "WRONG ANSWER");
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    const parentElement = screen.getByRole("textbox").parentElement;
    if (!parentElement) throw new Error("the parent of the input is null.")
    expect(parentElement).toHaveStyle(`background-color: #fffaf2`)
    userEvent.clear(screen.getByRole("textbox"));
    userEvent.type(screen.getByRole("textbox"), word.kana);
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(mockOnNext.mock.calls.length).toBe(1);
    expect(mockOnNext.mock.calls[0][0]).toBe(false);
  })

  test.each(wordTypeExamples)("correct answer with kana, enter pressed once", (word: Word) => {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    userEvent.type(screen.getByRole("textbox"), word.kana);
    const parentElement = screen.getByRole("textbox").parentElement;
    if (!parentElement) throw new Error("the parent of the input is null.")
    expect(parentElement).toHaveStyle(`background-color: #e9fce9`)
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(mockOnNext.mock.calls.length).toBe(1);
    expect(mockOnNext.mock.calls[0][0]).toBe(true);
  })

  test.each(wordTypeExamples)("correct answer with kanji, enter pressed once", (word: Word) => {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    userEvent.type(screen.getByRole("textbox"), word.kanji);
    const parentElement = screen.getByRole("textbox").parentElement;
    if (!parentElement) throw new Error("the parent of the input is null.")
    expect(parentElement).toHaveStyle(`background-color: #e9fce9`)
    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(mockOnNext.mock.calls.length).toBe(1);
    expect(mockOnNext.mock.calls[0][0]).toBe(true);
  })

  /**
  test.each(wordTypeExamples)("similar answer with kana, pressed enter once, correct answer input, pressed enter once", (word: WordType)=> {
    let mockOnNext = jest.fn();
    render(<PracticeWordWithInput word={word} onNext={mockOnNext}/>);
    if (word.similarWordUUIDs) {
      const similarWord = availableWords[word.similarWordUUIDs[0]];
      userEvent.type(screen.getByRole("textbox"), similarWord.kana);
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      const parentElement = screen.getByRole("textbox").parentElement;
      expect(parentElement).toHaveStyle(`background-color: #ccffff`)
      userEvent.clear(screen.getByRole("textbox"));
      userEvent.type(screen.getByRole("textbox"), word.kana);
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      expect(mockOnNext.mock.calls.length).toBe(1);
      expect(mockOnNext.mock.calls[0][0]).toBe(true);
    }
  })
  **/
})
