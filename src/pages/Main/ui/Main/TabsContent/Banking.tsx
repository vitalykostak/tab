import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface BankingProps {
    className?: string
}

const Banking: FC<BankingProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>Banking</div>
})

export default Banking
