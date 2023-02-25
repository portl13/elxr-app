import React from "react";

import { LibraryListItem } from "./library-list-item/LibraryListItem";
import { LibraryItemView } from "./library-item-view/LibraryItemView";

export const Library = () => {
  /*
    const dispatch = useAppDispatch();

    const {loading, error, data, refetch, networkStatus} = useQuery(
        MY_PROFILE,
        {
            variables: {},
            notifyOnNetworkStatusChange: true,
        },
    );

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            // console.log(data)
            dispatch(setUserProfile(data.myProfile));
        }
    }, [data]);
    */

  return (
    <div className="Library">
      <LibraryItemView />
      {[
        {
          title: "Example Video",
          thumbnail: "",
          source: "https://streamable.com/ifjh",
          type: "video",
        },
        /*
                        {
                            title: "The Beginner’s Guide to the Keto Diet",
                            thumbnail: "https://static.parade.com/wp-content/uploads/2019/12/keto-FTR.jpg",
                            // source: "https://hsc.unm.edu/health/patient-care/developmental-disabilities/docs/ketogenic-diet-eng.pdf",
                            // source: "http://africau.edu/images/default/sample.pdf",
                            source: "https://www.nerdfitness.com/wp-content/uploads/2019/01/NERD-Beginner-Guide-To-Keto.pdf",
                            type: "pdf",
                        },
                        {
                            title: "Thing 3",
                            thumbnail: "",
                            source: "",
                            type: "",
                        },
                         */
      ].map((item) => {
        return <LibraryListItem item={item} key={item.title} />;
      })}
    </div>
  );
};
