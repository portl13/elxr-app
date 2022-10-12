import { css } from '@emotion/core'

export const BuilderStyle = css`
  .section-heading {
    text-transform: uppercase;
  }

  .section-heading h4 {
    text-transform: uppercase;
  }

  .move-actions {
    width: 50px;
    margin-right: 20px;
  }

  .none-button {
    background-color: transparent;
    border: 0;
    color: var(--white-color);
    outline: none;
  }

  .move-actions-up,
  .move-actions-down {
    width: 9px;
    height: 20px;
  }

  .no-pointer {
    cursor: default;
  }

  .move-actions-grip {
    height: 25px;
    height: 13px;
  }
  .b-remove {
    opacity: 1;
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