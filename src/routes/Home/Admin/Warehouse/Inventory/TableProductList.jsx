import React, { useState, useEffect } from 'react'

const TableProductList = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [resultsPerPage, setResultsPerPage] = useState(5)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/warehouse')
                const result = await response.json()
                const productsList = result.content.getProducts
                shuffle(productsList) // Shuffle the products array
                setProducts(productsList)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])

    // Function to shuffle array elements
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
    }

    const convertGoogleDriveLink = (url) => {
        if (!url) {
            return ''
        }

        if (url.startsWith('https://drive.google.com/uc?export=view&id=')) {
            return url
        }

        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
        if (fileIdMatch) {
            return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
        }

        return url
    }

    const calculateTotalQuantity = (warehouseProducts) => {
        return warehouseProducts.reduce((acc, item) => acc + item.quantity, 0)
    }

    const determineStatus = (quantity) => {
        if (quantity === 0) {
            return { status: 'Out of stock', color: '#F07167' }
        } else if (quantity < 15) {
            return { status: 'Low stock', color: '#FFD600' }
        } else if (quantity < 25) {
            return { status: 'Near-low stock', color: '#A0D900' }
        } else {
            return { status: 'High stock', color: '#485935' }
        }
    }

    // Pagination Calculations
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    const currentResults = products.slice(indexOfFirstResult, indexOfLastResult)
    const totalPages = Math.ceil(products.length / resultsPerPage)

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
        <div style={{ padding: '1rem' }}>
            <table
                style={{
                    minWidth: '100%',
                    borderCollapse: 'collapse',
                    //border: '1px solid #485935',
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                //border: '1px solid #485935',
                                padding: '10px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor: '#CFCFCA',
                                width: '85px',
                            }}
                        ></th>
                        <th
                            style={{
                                //border: '1px solid #485935',
                                color: '#485935',
                                fontSize: 20,
                                fontFamily: 'Poppins',
                                fontWeight: '600',
                                textAlign: 'center',
                                backgroundColor: '#CFCFCA',
                                padding: '10px',
                            }}
                        >
                            Name
                        </th>
                        <th
                            style={{
                                //border: '1px solid #485935',
                                color: '#485935',
                                fontSize: 20,
                                fontFamily: 'Poppins',
                                fontWeight: '600',
                                textAlign: 'center',
                                backgroundColor: '#CFCFCA',
                                padding: '10px',
                            }}
                        >
                            Quantity in stock
                        </th>
                        <th
                            style={{
                                //border: '1px solid #485935',
                                color: '#485935',
                                fontSize: 20,
                                fontFamily: 'Poppins',
                                fontWeight: '600',
                                textAlign: 'center',
                                backgroundColor: '#CFCFCA',
                                padding: '10px',
                            }}
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentResults.map((product) => {
                        const totalQuantity = calculateTotalQuantity(
                            product.warehouse_products,
                        )
                        const { status, color } = determineStatus(totalQuantity)
                        const imageUrl =
                            convertGoogleDriveLink(product.product_img) ||
                            'https://via.placeholder.com/70'
                        return (
                            <tr key={product.product_id}>
                                <td
                                    style={{
                                        padding: '8px',
                                        textAlign: 'center',
                                        //borderLeft: '1px solid #485935',
                                        //borderRight: '1px solid #485935',
                                    }}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={product.product_name}
                                        style={{ height: '70px' }}
                                    />
                                </td>
                                <td
                                    style={{
                                        color: '#485935',
                                        fontSize: 20,
                                        fontFamily: 'Poppins',
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        //borderLeft: '1px solid #485935',
                                        //borderRight: '1px solid #485935',
                                    }}
                                >
                                    {product.product_name}
                                </td>
                                <td
                                    style={{
                                        color: '#485935',
                                        fontSize: 20,
                                        fontFamily: 'Poppins',
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        //borderLeft: '1px solid #485935',
                                        //borderRight: '1px solid #485935',
                                    }}
                                >
                                    {totalQuantity}
                                </td>
                                <td
                                    style={{
                                        color: color,
                                        fontSize: 20,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'italic',
                                        fontWeight: '900',
                                        textAlign: 'center',
                                    }}
                                >
                                    {status}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Upgraded Pagination Controls */}
            <div
                style={{
                    marginTop: '1.5rem',
                    padding: '10px 15px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <div style={{ fontSize: '14px', color: '#485935' }}>
                    {products.length > 0 ? (
                        <span>
                            Showing {indexOfFirstResult + 1} to{' '}
                            {Math.min(indexOfLastResult, products.length)} of {products.length} Results
                        </span>
                    ) : (
                        <span>No results found</span>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        style={{
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 12px',
                            border: 'none',
                            backgroundColor: currentPage === 1 ? '#ddd' : '#485935',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Prev
                    </button>
                    <span style={{ fontSize: '14px', color: '#485935' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        style={{
                            padding: '6px 12px',
                            border: 'none',
                            backgroundColor:
                                currentPage === totalPages || totalPages === 0 ? '#ddd' : '#485935',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor:
                                currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TableProductList