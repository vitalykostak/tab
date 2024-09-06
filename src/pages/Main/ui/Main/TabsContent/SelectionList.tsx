import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface SelectionListProps {
    className?: string
}

const SelectionList: FC<SelectionListProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>SelectionList</div>
})

export default SelectionList
