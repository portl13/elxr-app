import React from 'react'
import styles from './LayoutDashBoard.module.css'
import Meta from './Meta'
function LayoutDashBoard({ children, sidebar }) {
  return (
    <>
      <Meta />
      <div className={styles.main_grid}>
        <aside
        className={styles.sidebar}
        >
            {sidebar}
        </aside>
        <header className={styles.header}></header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

export default LayoutDashBoard
