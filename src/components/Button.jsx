import React from 'react'

export default function Button({loading, text, className}) {

    return (
        <div className={className}>
            <button disabled={loading} className='w-full text-center py-3 text-sm text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer outline-1 outline-blue-500'>
                {loading ? <span className="animate-spin inline-block w-4 h-4 border-4 border-r-transparent rounded-full mr-2" role="status"></span> : null}
                {text}
            </button>
        </div>
    )
}
