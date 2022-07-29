import { css } from '@emotion/core'

export const BuilderStyle = css`
.lesson-item {
  border: 1px solid #ccc;
  border-bottom: 0.5px solid #ccc;
  padding: 0 10px;
}
.lesson-item:last-child {
  border-bottom: 0.5px solid #ccc;
}
.section-heading {
  text-transform: uppercase;
  background-color: #1a1a1a;
}
.section-heading h4 {
  text-transform: uppercase;
}
.sfwd-lessons {
  background-color: var(--bg);
}
.move-actions {
  width: 50px;
  margin-right: 20px;
}
.none-button {
  background-color: transparent;
  border: 0;
  color: var(--typo);
  outline: none;
}
.move-actions-up,
.move-actions-down {
  width: 15px;
  height: 25px;
}

.no-pointer {
  cursor: default;
}
.move-actions-grip {
  height: 25px;
  height: 13px;
}
.section-edit {
  align-items: center;
  justify-content: space-between;
  padding-right: 20px !important;
}
.section-edit:hover .b-remove {
  opacity: 1;
}
.b-remove {
  opacity: 0;
}
.b-edit {
  width: 20px;
}
.plus-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.plus-container {
  align-items: center;
  border: 1px solid;
  border-radius: 50%;
  padding: 3px;
}
.no-lessons {
  border: 1px solid #ccc;
}
.input-add {
  background-color: var(--bg);
  color: var(--typo);
  border: 1px solid #ccc;
}
`