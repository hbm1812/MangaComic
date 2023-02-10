import styles from "./SidebarPage.module.scss";
import clsx from "clsx";
import { Fragment } from "react";
// base component
import Heading from "../../../Components/Heading";
import ItemNews from "../../../Components/ItemNews";
import { HeadingLeftIcon, HeadingRightIcon } from "../../../Components/Icon"

function SidebarPage({type, title = "", subTitle = ""}) {
    return ( <section className={clsx(styles.wrapper)}>
        {
            type == "manga" ? 
                <Fragment>
                    {/* <Heading active>
                        Truyện mới nhất
                    </Heading> */}
                    <div className={clsx(styles.listContent)}>
                        {/* <ItemWithThumbnail type="mangaRow" setColumn={1} />
                        <ItemWithThumbnail type="mangaRow" setColumn={1} />
                        <ItemWithThumbnail type="mangaRow" setColumn={1} />
                        <ItemWithThumbnail type="mangaRow" setColumn={1} />
                        <ItemWithThumbnail type="mangaRow" setColumn={1} />                         */}
                    </div>
                </Fragment>
            : type == "news" ? 
                <Fragment>
                    <Heading active>
                        {title}
                    </Heading>
                    <div className={clsx(styles.listContent)}>
                        <ItemNews type="watched"/>
                        <ItemNews type="watched"/>
                        <ItemNews type="watched"/>
                    </div>
                    <Heading active>
                        {subTitle}
                    </Heading>
                    <div className={clsx(styles.listContent)}>
                        <ItemNews type="watched"/>
                        <ItemNews type="watched"/>
                        <ItemNews type="watched"/>
                    </div>
                </Fragment>
            : type == "listEpisode" ?
                <Fragment>
                    <div className={clsx(styles.episodeWrapper)}>
                        <div className={clsx(styles.headerEpisode)}>
                            <div className={clsx(styles.headerListEpisode)}>
                                Danh sách tập
                            </div>
                            <div className={clsx(styles.headerComment)}>
                                Bình luận
                            </div>
                        </div>
                        <div className={clsx(styles.subHeaderEpisode)}>
                            Tổng số 12 video
                        </div>
                        <div className={clsx(styles.listEpisode)}>
                            
                        </div>
                    </div>
                    
                </Fragment>
            : type == "recommend" ?
                <Fragment>
                    <Heading active>
                        {title}
                    </Heading>
                    <div className={clsx(styles.listContent)}>
                        <ItemNews type="recommend" setColumn={1}/>
                        <ItemNews type="recommend" setColumn={1}/>
                        <ItemNews type="recommend" setColumn={1}/>
                    </div>
                    <Heading active>
                        {subTitle}
                    </Heading>
                    <div className={clsx(styles.listContent)}>
                        <ItemNews type="recommend" setColumn={1}/>
                        <ItemNews type="recommend" setColumn={1}/>
                        <ItemNews type="recommend" setColumn={1}/>
                    </div>
                </Fragment>
            :
            ""
        }
        
    </section> );
}

export default SidebarPage;