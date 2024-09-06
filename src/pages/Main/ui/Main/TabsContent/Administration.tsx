import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface AdministrationProps {
    className?: string
}

const Administration: FC<AdministrationProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>Administration</div>
})

export default Administration
