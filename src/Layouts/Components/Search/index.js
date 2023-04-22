import HeadlessTippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from "./Search.module.scss";
import { useEffect, useState, useRef } from 'react';
import { SearchIcon, CircleXmarkIcon, SpinnerIcon } from '../../../Components/Icon';

import useDebounce from "../../../Hooks/useDebounce";
import ItemMangaSearch from "../../../Components/ItemMangaSearch";
import * as services from "../../../services/searchServices";
import axios from 'axios';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchResult([]);
        setSearchValue("");
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    }

    const handleClickItem = () => {
        setSearchResult([]);
        setSearchValue("");
    }

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if(searchValue.startsWith(" ")) {
            return;
        }
        setSearchValue(e.target.value);
    }

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        console.log("hello");

        setLoading(true);
        axios.get(`http://localhost/manga-comic-be/api/stories/findStoriesWithNameLess.php?name=${encodeURIComponent(debounced)}`)
            .then((res) => {
                // console.log("data", res.data)
                setSearchResult(res.data)
                setLoading(false);
            })

            .catch(() => {
                console.log("error")
                setLoading(false);                
            })

        // const fetchApi = async () => {
        //     setLoading(true);

        //     const result = await services.search(debounced);
        //     setSearchResult(result);

        //     setLoading(false);
        // }
        
        // fetchApi();
        // using axios
        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get(`users/search`, {
        //             params: {
        //                 q: debounced,
        //                 type: "less"
        //             }
        //         })
        //         setSearchResult(res.data)
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }
        // }
        // fetchApi();     
        
        // fetch api
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setSearchResult(res.data)
        //         setLoading(false);
        //     })

        //     .catch(() => {
        //         setLoading(false);  
        //     })

    }, [debounced])

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={clsx(styles.searchResultWrapper)} tabIndex="-1" {...attrs}>
                    <h3 className={clsx(styles.searchResultTitle)}>
                        Danh sách truyện
                    </h3>
                    <ul className={clsx(styles.seachResultList)}>
                        {searchResult.map((result, index) => {
                            return (
                                <ItemMangaSearch key={index} data={result} onClick={handleClickItem} />
                            )

                        })}
                    </ul>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={clsx(styles.navbarSearchBox)}>
                <input className={clsx(styles.navbarSearch)}
                    type=""
                    name=""
                    value={searchValue}
                    ref={inputRef}
                    placeholder="Tìm kiếm manga"
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                <label htmlFor="" className={clsx(styles.navbarSearchLabel)}>Tìm kiếm manga</label>
                {searchValue && !loading && <CircleXmarkIcon className={clsx(styles.navbarClearIcon)} onClick={handleClear} />}
                {loading && <SpinnerIcon className={clsx(styles.navbarSpinnerIcon)} />}

                <SearchIcon className={clsx(styles.navbarSearchIcon, {
                    [styles.iconGlow]: searchValue.length > 0,
                })} />
            </div>
        </HeadlessTippy>
    );
}

export default Search;