import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import dcLogo from '../img/act_early_dc.svg'
import cdcLogo from '../img/cdc.svg'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div className='container'>
    <section className="section">
      <div className='columns'>
        <div className='column is-three-fifths is-offset-one-fifth'>
          <div className="container">
            <figure className="image is-3by-1">
              <img src={dcLogo} alt="Act Early DC Logo" />
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section className='section'>
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <nav className='level is-mobile'>
            <div className='level-item'>
              <figure className='image is-128x128'>
                <img src={cdcLogo} alt="CDC Logo" />
              </figure>
              <div className='content'>
                <h3 className="title has-text-primary is-size-1-desktop is-size-2-tablet is-size-4-mobile">
                  &nbsp;&nbsp;{heading}
                </h3>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
