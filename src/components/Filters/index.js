import React, { memo } from 'react'
import './index.css'
const filters = ['all', 'active', 'complete']

function Filters({ filter, setFilter }) {
	return (
		<div className='filters'>
			{filters.map((name) => (
				<div
					key={name}
					className={`filter ${name == filter ? 'active' : ''}`}
					onClick={() => setFilter(name)}
				>
					{name}
				</div>
			))}
		</div>
	)
}

export default memo(Filters)
