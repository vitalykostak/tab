import { memo, useState, type FC } from 'react'

import ChevronIcon from '@/shared/assets/icons/chevron.svg'
import { classNames } from '@/shared/lib/styles/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Menu from '@/shared/ui/Menu/Menu'
import { type TabProps } from '@/shared/ui/Tab/Tab'

import PinIcon from '../assets/icons/pin.svg'
import { useRenderContent } from '../deps'
import { mapTabStateItemsToContextMenuProps } from '../libs/tabs'
import { useInteractiveTabs } from '../model/hooks/useInteractiveTabs'

import styles from './InteractiveTabs.module.scss'
import { TabsLine } from './components/TabsLine'

export type InteractiveTap = Omit<TabProps, 'onClick'> & { id: string }
export type TabState = InteractiveTap & {
    pinned?: boolean
    isOutsideOfLine?: boolean
}

type InteractiveTabsProps = {
    tabs: InteractiveTap[]
    className?: string
}

const InteractiveTabs: FC<InteractiveTabsProps> = memo(props => {
    const { tabs, className } = props

    const renderContent = useRenderContent()

    const {
        tabsStatePinned,
        tabsStateUnPinned,
        pinTab,
        unPinTab,
        handlePinnedDragEnd,
        handleUnPinnedDragEnd,
        selectTab,
        handleOutsideOfLine,
        areAllTabsVissible,
        tabsOutsideOfLine,
        selectedTabId
    } = useInteractiveTabs(tabs)

    const [hiddenTabsContextMenu, setHiddenTabsContextMenu] = useState<boolean>(false)
    const showHiddenTabsContextMenu = () => {
        setHiddenTabsContextMenu(true)
    }
    const closeHiddenTabsContextMenu = () => {
        setHiddenTabsContextMenu(false)
    }

    const getTabContextMenuItems = (tabId: string) => {
        const targetTab = [...tabsStatePinned, ...tabsStateUnPinned].find(t => t.id === tabId)
        const isPinned = targetTab?.pinned

        return [
            {
                icon: isPinned ? targetTab.icon : <PinIcon />,
                label: isPinned ? targetTab.title : 'Tab anpinnen',
                onClick: isPinned ? unPinTab(tabId) : pinTab(tabId)
            }
        ]
    }

    const mods = { [styles.isOverflownTabs]: !areAllTabsVissible }

    const additionsClasses = [className]

    return (
        <>
            <div className={classNames(styles.wrapper, mods, additionsClasses)}>
                <TabsLine
                    tabsState={tabsStatePinned}
                    selectTab={selectTab}
                    handleDragEnd={handlePinnedDragEnd}
                    className={styles.pinnedContainer}
                    getContextMenuItems={getTabContextMenuItems}
                />
                <TabsLine
                    tabsState={tabsStateUnPinned}
                    selectTab={selectTab}
                    handleDragEnd={handleUnPinnedDragEnd}
                    className={styles.unPinnedContainer}
                    getContextMenuItems={getTabContextMenuItems}
                    onChangeVisibility={(tabId: string) => (isVisible: boolean) => {
                        handleOutsideOfLine(tabId, !isVisible)
                    }}
                />
                {!areAllTabsVissible && (
                    <Button
                        icon={<ChevronIcon />}
                        className={styles.buttonContainer}
                        disabled={hiddenTabsContextMenu}
                        onClick={showHiddenTabsContextMenu}
                        variant={hiddenTabsContextMenu ? 'accent' : 'normal'}
                        reverseIconVerticalDirection={hiddenTabsContextMenu}
                    />
                )}
                {hiddenTabsContextMenu && !areAllTabsVissible && (
                    <Menu
                        className={styles.contextMenuContainer}
                        items={mapTabStateItemsToContextMenuProps(
                            tabsOutsideOfLine,
                            (tabId: string) => () => {
                                selectTab(tabId)()
                                closeHiddenTabsContextMenu()
                            }
                        )}
                        onClickOutside={closeHiddenTabsContextMenu}
                    />
                )}
            </div>
            {selectedTabId && renderContent(selectedTabId)}
        </>
    )
})

export default InteractiveTabs
