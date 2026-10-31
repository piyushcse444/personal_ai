"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

type Message = {
  id: string;
  content: string;
};

const suggestions = [
  {
    title: "Think through an idea",
    prompt: "Help me think through an idea I have",
    icon: "✳",
  },
  {
    title: "Learn something new",
    prompt: "Explain a complicated topic in simple terms",
    icon: "⌘",
  },
  {
    title: "Make a plan",
    prompt: "Help me turn a goal into a practical plan",
    icon: "↗",
  },
];

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.8 14.1 9.9 21.2 12l-7.1 2.1-2.1 7.1-2.1-7.1L2.8 12l7.1-2.1L12 2.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="m19 2 .7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7L19 2Z" fill="currentColor" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 15V5m0 0L6 9m4-4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Home() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function startNewChat() {
    setMessages([]);
    setDraft("");
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();

    if (!content) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), content },
    ]);
    setDraft("");
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Personal AI home">
          <span className="brand-mark">
            <SparkleIcon />
          </span>
          <span className="brand-name">personal<span>ai</span></span>
        </Link>

        <button className="new-chat-button" onClick={startNewChat} type="button">
          <PlusIcon />
          <span>New chat</span>
          <span className="shortcut">⌘ K</span>
        </button>

        <div className="sidebar-section">
          <p className="section-label">Workspace</p>
          <Link aria-current="page" className="nav-item nav-item-active" href="/">
            <span className="nav-icon chat-icon" aria-hidden="true" />
            <span>Chat</span>
          </Link>
          <div className="nav-item nav-item-disabled" aria-disabled="true">
            <span className="nav-icon memory-icon" aria-hidden="true" />
            <span>Memory</span>
            <span className="coming-soon">Soon</span>
          </div>
        </div>

        <div className="sidebar-section recent-section">
          <p className="section-label">Recent</p>
          {messages.length > 0 ? (
            <p className="recent-chat">
              <span className="recent-chat-dot" />
              <span>{messages[0].content}</span>
            </p>
          ) : (
            <p className="empty-recent">Your conversations will show up here.</p>
          )}
        </div>

        <div className="sidebar-bottom">
          <div className="preview-note">
            <span className="preview-note-icon"><SparkleIcon /></span>
            <div>
              <p>Early preview</p>
              <span>AI and memory are not connected yet.</span>
            </div>
          </div>
          <div className="profile-row">
            <span className="avatar">P</span>
            <span className="profile-name">Personal workspace</span>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark"><SparkleIcon /></span>
            <span className="brand-name">personal<span>ai</span></span>
          </div>
          <div className="topbar-spacer" />
          <span className="connection-status">
            <span className="status-dot" />
            Preview mode
          </span>
          <button className="model-button" type="button" disabled>
            No model connected
            <span aria-hidden="true">⌄</span>
          </button>
        </header>

        <div className={`conversation ${messages.length > 0 ? "conversation-active" : ""}`}>
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-sparkle"><SparkleIcon /></div>
              <p className="eyebrow">YOUR SPACE TO THINK</p>
              <h1>A little more personal.<br /><span>A lot more useful.</span></h1>
              <p className="welcome-copy">
                A place for your ideas, questions, and everything you want to
                figure out. What’s on your mind?
              </p>
              <div className="suggestion-grid">
                {suggestions.map((suggestion) => (
                  <button
                    className="suggestion-card"
                    key={suggestion.title}
                    onClick={() => setDraft(suggestion.prompt)}
                    type="button"
                  >
                    <span className="suggestion-icon">{suggestion.icon}</span>
                    <span>{suggestion.title}</span>
                    <span className="suggestion-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="message-list" aria-live="polite">
              {messages.map((message) => (
                <article className="message-row" key={message.id}>
                  <span className="message-avatar">P</span>
                  <p className="message-content">{message.content}</p>
                </article>
              ))}
              <div className="offline-message">
                <span className="offline-icon"><SparkleIcon /></span>
                <p>
                  This is a frontend preview. Your message is shown locally;
                  no AI response has been generated.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="composer-area">
          <form className="composer" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="message-input">Write a message</label>
            <textarea
              autoComplete="off"
              id="message-input"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              placeholder="Message Personal AI..."
              rows={1}
              value={draft}
            />
            <div className="composer-footer">
              <span className="composer-hint">Preview only · nothing is sent to an AI</span>
              <button
                aria-label="Send message"
                className="send-button"
                disabled={!draft.trim()}
                type="submit"
              >
                <ArrowUpIcon />
              </button>
            </div>
          </form>
          <p className="disclaimer">
            Personal AI is still taking shape. Your conversations aren’t saved yet.
          </p>
        </div>
      </section>
    </main>
  );
}
