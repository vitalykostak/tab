import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface SaleProps {
    className?: string
}

const Sale: FC<SaleProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>Sale</div>
})

export default Sale
