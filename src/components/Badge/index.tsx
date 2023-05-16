import styled from 'styled-components'

type BadgeProps = {
  status?: string
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'active':
      return '#28a745'
    case 'inactive':
      return '#dc3545'
    default:
      return '#6c757d'
  }
}

const Container = styled.span<{ status?: string }>`
  display: inline-block;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 0.25rem;
  color: #fff;
  background-color: ${props => getStatusColor(props.status)};
`

export function Badge({
  status,
}: // children,
//  ...props
BadgeProps) {
  return (
    <Container status={status}>
      {/* {children} */}
      {status || 'pending'}
    </Container>
  )
}
