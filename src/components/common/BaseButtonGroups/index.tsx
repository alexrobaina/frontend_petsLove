import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  group: {
    name: string
    path: string
  }[]
  buttonSelected?: string
  handleSelectButtonGroup?: (value: string) => void
}

export const BaseButtonGroups: FC<Props> = ({
  group,
  buttonSelected,
  handleSelectButtonGroup,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <span className="isolate inline-flex rounded-md">
      {group.map((item, index) => {
        // Initialize class names common to all buttons
        const isSelected = buttonSelected === item.path
        let classNames = `${
          isSelected
            ? 'bg-primary-200 ring-primary-400 text-primary-900'
            : 'transparent'
        } relative inline-flex items-center px-3 text-sm font-semibold h-9
        text-primary-950 ring-1 ring-inset ring-primary-400 hover:bg-primary-200 focus:z-10`

        // Modify class names based on position within array
        if (index === 0) {
          classNames += ' rounded-l-md'
        }
        if (index === group.length - 1) {
          classNames += ' -ml-px rounded-r-md'
        } else {
          classNames += ' -ml-px'
        }

        return (
          <button
            key={index}
            type="button"
            className={classNames}
            onClick={() =>
              handleSelectButtonGroup && handleSelectButtonGroup(item.path)
            }
          >
            {t(`common:${item.name}`)}
          </button>
        )
      })}
    </span>
  )
}
