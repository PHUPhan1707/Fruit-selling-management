import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    delProductThunk,
    storeThunk,
} from '../../../../redux/storeAReducer/storeAThunk'

// eslint-disable-next-line react/prop-types
const Table = ({ type }) => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [resultsPerPage, setResultsPerPage] = useState(5)

    const dispatch = useDispatch()
    const { listProduct } = useSelector((state) => state.storeAReducer)

    useEffect(() => {
        dispatch(storeThunk()) // Lấy dữ liệu sản phẩm từ Redux
    }, [dispatch])

    useEffect(() => {
        let filteredData = listProduct

        // Lọc theo loại sản phẩm
        if (type !== 'all') {
            filteredData = filteredData.filter(
                (item) => item.product_condition === type
            )
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            filteredData = filteredData.filter((item) =>
                item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Sắp xếp dữ liệu
        if (sortConfig.key) {
            const sortedData = [...filteredData].sort((a, b) => {
                let aValue, bValue
                if (sortConfig.key === 'quantity') {
                    // Sắp xếp theo số lượng tồn kho
                    aValue = a.shelf_products[0]?.quantity ?? 0
                    bValue = b.shelf_products[0]?.quantity ?? 0
                } else {
                    aValue = a[sortConfig.key]
                    bValue = b[sortConfig.key]
                }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
            setData(sortedData)
        } else {
            setData(filteredData) // Nếu không có sắp xếp, chỉ lọc
        }
        setCurrentPage(1) // Reset to first page on data change
    }, [type, listProduct, searchTerm, sortConfig]) // Phụ thuộc vào `type`, `listProduct`, `searchTerm`, và `sortConfig`

    const sortData = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const deleteProduct = (id) => {
        const requestData = {
            product_id: id,
        }
        dispatch(delProductThunk(requestData))
            .then(() => {
                dispatch(storeThunk()) // Làm mới danh sách sản phẩm sau khi xóa
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Pagination: calculating current results
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    const currentResults = data.slice(indexOfFirstResult, indexOfLastResult)
    const totalPages = Math.ceil(data.length / resultsPerPage)

    const showList = () => {
        return currentResults.map((item) => {
            return (
                <tr className="border-none text-center" key={item.product_id}>
                    <td className="py-8">
                        <img
                            src={item.product_img}
                            className="mx-auto h-[4rem] w-fit"
                            alt=""
                        />
                    </td>
                    <td className="text-left text-[1.25rem] font-bold text-green_dark2">
                        {item.product_name}
                    </td>
                    <td className="text-[1.125rem] text-green_dark2">
                        {item.selling_price} $
                    </td>
                    <td className="text-[1.125rem] text-green_dark2">
                        {item.import_price} $
                    </td>
                    <td className="text-[1.125rem] text-green_dark2">
                        {item?.shelf_products[0].quantity} kg
                    </td>
                    <td className="text-[1.125rem] text-green_dark2">
                        {item.product_condition}
                    </td>
                    <td>
                        <button
                            onClick={() => deleteProduct(item.product_id)}
                            className="rounded-full bg-green_dark1 px-4 py-2 text-offwhite"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const handleResultsPerPageChange = (e) => {
        setResultsPerPage(Number(e.target.value))
        setCurrentPage(1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Search product..."
                    className="input input-bordered input-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-center text-[1.25rem] text-green_dark1">
                            <th>PRODUCT</th>
                            <th
                                className="cursor-pointer text-left"
                                onClick={() => sortData('product_name')}
                            >
                                NAME
                                {sortConfig.key === 'product_name' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th
                                className="cursor-pointer"
                                onClick={() => sortData('selling_price')}
                            >
                                SELLING PRICE
                                {sortConfig.key === 'selling_price' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th
                                className="cursor-pointer"
                                onClick={() => sortData('import_price')}
                            >
                                IMPORT PRICE
                                {sortConfig.key === 'import_price' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th
                                className="cursor-pointer"
                                onClick={() => sortData('quantity')}
                            >
                                ON SHELF
                                {sortConfig.key === 'quantity' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{showList()}</tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                <div className="text-sm text-gray-700 mb-2 md:mb-0">
                    {data.length > 0 ? (
                        <span>
                            Showing {indexOfFirstResult + 1} to{' '}
                            {Math.min(indexOfLastResult, data.length)} of {data.length} Results
                        </span>
                    ) : (
                        <span>No results found</span>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <select
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        className="select select-bordered select-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="btn btn-sm"
                    >
                        Prev
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="btn btn-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table