import { memo, useEffect, useRef, useState } from 'react'

import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Config from 'Config'

import LanguageSwitcher from 'components/LanguageSwitcher'

import useTitle from 'hooks/useTitle'

const Home: React.FC = () => {
  const { t, i18n } = useTranslation()
  const setTitle = useTitle()
  const [items, setItems] = useState<number[]>([])
  const [selecttedItem, setSelectedItem] = useState<number>()
  const lastPass = useRef(0)

  useEffect(() => {
    setTitle(t('home.head-title'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage])

  return (
    <Container>
      <div>
        <div>
          <h1>SENHA {selecttedItem}</h1>
        </div>

        <div
          style={{
            height: 200,
            overflowY: 'auto',
            width: 300,
          }}
        />
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            if (items.length === 0) return

            setSelectedItem(items[0])

            setItems((prev) => {
              const [_, ...rest] = prev
              return rest
            })
          }}
        >
          Próxima senha
        </button>

        <button
          type="button"
          onClick={() => {
            lastPass.current += 1
            setItems((prev) => [...prev, lastPass.current])
          }}
        >
          Retirar senha
        </button>
      </div>
    </Container>
  )
}

export default memo(Home)
