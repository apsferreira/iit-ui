import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card><CardBody>Content</CardBody></Card>)
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('renders with header and footer', () => {
    render(
      <Card>
        <CardHeader><CardTitle>Title</CardTitle></CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Title')).toBeDefined()
    expect(screen.getByText('Body')).toBeDefined()
    expect(screen.getByText('Footer')).toBeDefined()
  })
})
