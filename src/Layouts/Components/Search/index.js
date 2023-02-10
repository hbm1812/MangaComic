import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from "./Search.module.scss";
import { useEffect, useState, useRef } from 'react';
import { SearchIcon, CircleXmarkIcon } from '../../../Components/Icon';
import ItemMangaSearch from "../../../Components/ItemMangaSearch";

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(true);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchResult([]);
        setSearchValue("");
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    }

    useEffect(() => {
        if(!searchValue.trim()) {
            return;
        }

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${searchValue}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data)
            })
        
    }, [searchValue])


    // useEffect(() => {
    //     if (!debouncedValue.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const result = await searchServices.search(debouncedValue);

    //         setSearchResult(result);
    //         setLoading(false);
    //     };

    //     fetchApi();
    // }, [debouncedValue]);
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
                                <ItemMangaSearch key={index} data={result} />
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
                    onChange={((e) => {
                        setSearchValue(e.target.value);
                    })}
                    onFocus={() => setShowResult(true)}
                />
                <label htmlFor="" className={clsx(styles.navbarSearchLabel)}>Tìm kiếm manga</label>
                {searchValue && <CircleXmarkIcon className={clsx(styles.navbarClearIcon)} onClick={handleClear} />}

                <SearchIcon className={clsx(styles.navbarSearchIcon, {
                    [styles.iconGlow]: searchValue.length > 0,
                })} />
            </div>
        </HeadlessTippy>
    );
}

export default Search;