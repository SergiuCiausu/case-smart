import React from 'react'

const ProductPageHeader = ({ header }: { header: string }) => {
  return (
    <div
        className="h-[102px] white-background w-full flex items-center">
        <h3
            className="black-text w-[1220px] mx-auto">
            {header}
        </h3>
    </div>
  )
}

export default ProductPageHeader