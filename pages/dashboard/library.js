import React from 'react';
import DashBoard from '@components/dashboard/DashBoard';
import Library from '@components/dashboard/library/Library';

function LibraryPage() {
  return (
    <DashBoard title={"Library"}>
        <Library />
    </DashBoard>
  );
}

export default LibraryPage;
