import { useLocation, useParams, useSearchParams, history } from 'umi'
import { Button } from 'antd'
import { connect } from 'dva'
import { Ceshi } from '@@@'
import './styles.less'

export default function Login (props) {
  return (
    <div styleName="login2">
      login
      <Button>小花</Button>
      <Ceshi />
    </div>
  )
}
