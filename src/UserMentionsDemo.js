import { useState, useRef, useCallback, useEffect } from 'react'

// ─────────────────────────────────────────────
// useMentions — editor-agnostic mention hook
// ─────────────────────────────────────────────
// Usage:
//   const { mentionState, handleChange, handleKeyDown, selectMention, MentionDropdown } = useMentions({ users, onMentionInsert })
//
// Props:
//   users            – array of { id, name, avatar? }
//   onMentionInsert  – callback(mention: { id, name }) called when a mention is selected
//   trigger          – character that triggers mentions (default "@")

export function useMentions({
  users = [],
  onMentionInsert,
  trigger = '@',
} = {}) {
  const [mentionState, setMentionState] = useState({
    active: false,
    query: '',
    results: [],
    selectedIndex: 0,
    triggerIndex: -1,
  })

  const stateRef = useRef(mentionState)
  stateRef.current = mentionState

  const search = useCallback(
    (query) =>
      users
        .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6),
    [users],
  )

  // Call this from your editor's onChange / onInput handler.
  // Pass the current raw text value and the cursor position.
  const handleChange = useCallback(
    (text, cursorPos) => {
      const textBeforeCursor = text.slice(0, cursorPos)
      const triggerIdx = textBeforeCursor.lastIndexOf(trigger)

      if (triggerIdx === -1) {
        setMentionState((s) => ({
          ...s,
          active: false,
          query: '',
          results: [],
        }))
        return
      }

      // Make sure there's no space between trigger and cursor
      const query = textBeforeCursor.slice(triggerIdx + 1)
      if (/\s/.test(query)) {
        setMentionState((s) => ({
          ...s,
          active: false,
          query: '',
          results: [],
        }))
        return
      }

      const results = search(query)
      setMentionState({
        active: results.length > 0,
        query,
        results,
        selectedIndex: 0,
        triggerIndex: triggerIdx,
      })
    },
    [trigger, search],
  )

  // Call this from your editor's onKeyDown handler.
  // Returns true if the key was consumed by the mention logic.
  const handleKeyDown = useCallback(
    (e) => {
      const { active, results, selectedIndex } = stateRef.current
      if (!active || results.length === 0) return false

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setMentionState((s) => ({
          ...s,
          selectedIndex: (s.selectedIndex + 1) % s.results.length,
        }))
        return true
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setMentionState((s) => ({
          ...s,
          selectedIndex:
            (s.selectedIndex - 1 + s.results.length) % s.results.length,
        }))
        return true
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        const selected = results[selectedIndex]
        if (selected) selectMention(selected)
        return true
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setMentionState((s) => ({ ...s, active: false }))
        return true
      }
      return false
    },
    [], // selectMention added via ref below
  )

  // Call this to programmatically insert a mention.
  // Returns the new text with the @query replaced by @Name.
  const selectMention = useCallback(
    (user, currentText, cursorPos) => {
      const { triggerIndex } = stateRef.current
      const idx = triggerIndex !== -1 ? triggerIndex : cursorPos
      const before = (currentText ?? '').slice(0, idx)
      const after = (currentText ?? '').slice(
        cursorPos ?? idx + stateRef.current.query.length + 1,
      )
      const newText = `${before}@${user.name} ${after}`

      setMentionState({
        active: false,
        query: '',
        results: [],
        selectedIndex: 0,
        triggerIndex: -1,
      })
      onMentionInsert?.(user)
      return newText
    },
    [onMentionInsert],
  )

  const close = useCallback(() => {
    setMentionState((s) => ({ ...s, active: false }))
  }, [])

  return { mentionState, handleChange, handleKeyDown, selectMention, close }
}

// ─────────────────────────────────────────────
// MentionDropdown — the floating UI component
// ─────────────────────────────────────────────
// Renders a dropdown list of mention suggestions.
// Position it relative to your editor using anchorEl or style props.

export function MentionDropdown({ mentionState, onSelect, style = {} }) {
  const { active, results, selectedIndex } = mentionState
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.children[selectedIndex]
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (!active || results.length === 0) return null

  return (
    <div
      role="listbox"
      aria-label="Mention suggestions"
      ref={listRef}
      style={{
        position: 'absolute',
        zIndex: 1000,
        background: '#1e1e2e',
        border: '1px solid #3a3a5c',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        minWidth: '220px',
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      {results.map((user, i) => (
        <div
          key={user.id}
          role="option"
          aria-selected={i === selectedIndex}
          onMouseDown={(e) => {
            e.preventDefault() // prevent blur
            onSelect(user)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 14px',
            cursor: 'pointer',
            background: i === selectedIndex ? '#2d2d4e' : 'transparent',
            borderLeft:
              i === selectedIndex
                ? '3px solid #7c6af7'
                : '3px solid transparent',
            transition: 'background 0.12s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2d2d4e'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              i === selectedIndex ? '#2d2d4e' : 'transparent'
          }}
        >
          <Avatar user={user} size={30} />
          <span style={{ color: '#e2e2f0', fontSize: '14px', fontWeight: 500 }}>
            {user.name}
          </span>
          {user.role && (
            <span
              style={{ color: '#7c7c9c', fontSize: '12px', marginLeft: 'auto' }}
            >
              {user.role}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// Avatar — small helper
// ─────────────────────────────────────────────
function Avatar({ user, size = 32 }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const colors = ['#7c6af7', '#f76a6a', '#6af7b8', '#f7c26a', '#6ab4f7']
  const color = colors[user.name.charCodeAt(0) % colors.length]

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

// ─────────────────────────────────────────────
// Demo — plain textarea integration
// ─────────────────────────────────────────────
const DEMO_USERS = [
  { id: 1, name: 'Alice Kowalski', role: 'Engineer' },
  { id: 2, name: 'Bob Dimitrov', role: 'Designer' },
  { id: 3, name: 'Clara Ivanova', role: 'PM' },
  { id: 4, name: 'David Chen', role: 'Engineer' },
  { id: 5, name: 'Eva Petrova', role: 'QA' },
  { id: 6, name: 'Frank Mueller', role: 'DevOps' },
]

export default function MentionDemo() {
  const [text, setText] = useState('')
  const [mentions, setMentions] = useState([])
  const textareaRef = useRef(null)
  const wrapperRef = useRef(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })

  const { mentionState, handleChange, handleKeyDown, selectMention } =
    useMentions({
      users: DEMO_USERS,
      onMentionInsert: (user) => setMentions((m) => [...m, user]),
    })

  // Approximate caret position for dropdown placement
  const updateDropdownPos = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    // Simple heuristic: place below the textarea's top + line height * approx line
    const lineHeight = 24
    const lines = text.slice(0, ta.selectionStart).split('\n').length
    setDropdownPos({ top: lines * lineHeight + 8, left: 12 })
  }, [text])

  const onChange = (e) => {
    const val = e.target.value
    setText(val)
    handleChange(val, e.target.selectionStart)
    updateDropdownPos()
  }

  const onKeyDown = (e) => {
    const consumed = handleKeyDown(e)
    if (!consumed && e.key === 'Enter' && !e.shiftKey) {
      // Allow normal enter
    }
  }

  const onSelect = (user) => {
    const ta = textareaRef.current
    const newText = selectMention(user, text, ta?.selectionStart ?? text.length)
    setText(newText)
    setTimeout(() => ta?.focus(), 0)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#13131f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div style={{ width: '100%', maxWidth: '600px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1
            style={{
              color: '#e2e2f0',
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
            }}
          >
            @mention demo
          </h1>
          <p style={{ color: '#7c7c9c', fontSize: '14px', marginTop: '6px' }}>
            Type{' '}
            <kbd
              style={{
                background: '#2d2d4e',
                color: '#7c6af7',
                padding: '1px 6px',
                borderRadius: '4px',
                fontFamily: 'DM Mono',
                fontSize: '13px',
              }}
            >
              @
            </kbd>{' '}
            to tag someone
          </p>
        </div>

        {/* Editor wrapper */}
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Write a message... try @Bob or @Clara"
            rows={5}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: '#1e1e2e',
              border: '1px solid #3a3a5c',
              borderRadius: '12px',
              color: '#e2e2f0',
              fontSize: '15px',
              lineHeight: '24px',
              padding: '14px 16px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
              caretColor: '#7c6af7',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#7c6af7')}
            onBlur={(e) => (e.target.style.borderColor = '#3a3a5c')}
          />

          <MentionDropdown
            mentionState={mentionState}
            onSelect={onSelect}
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
          />
        </div>

        {/* Tagged people */}
        {mentions.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <p
              style={{
                color: '#7c7c9c',
                fontSize: '12px',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Tagged
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[...new Map(mentions.map((m) => [m.id, m])).values()].map(
                (user) => (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      background: '#2d2d4e',
                      borderRadius: '20px',
                      padding: '5px 12px 5px 6px',
                      border: '1px solid #3a3a5c',
                    }}
                  >
                    <Avatar user={user} size={22} />
                    <span style={{ color: '#e2e2f0', fontSize: '13px' }}>
                      {user.name}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Users list */}
        <div
          style={{
            marginTop: '32px',
            borderTop: '1px solid #2a2a3e',
            paddingTop: '20px',
          }}
        >
          <p
            style={{
              color: '#7c7c9c',
              fontSize: '12px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Available users
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {DEMO_USERS.map((user) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  background: '#1e1e2e',
                  borderRadius: '20px',
                  padding: '5px 12px 5px 6px',
                  border: '1px solid #2a2a3e',
                }}
              >
                <Avatar user={user} size={22} />
                <span style={{ color: '#9090b0', fontSize: '13px' }}>
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
