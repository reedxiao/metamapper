import React from "react"
import { compose } from "react-apollo"
import { Form, Icon, Input, Button, Row, Col, Switch } from "antd"
import { kebabCase } from "lodash"
import { useTranslation } from "react-i18next"
import PasswordInput from "app/Common/PasswordInput"
import { passwordStrengthValidator } from "lib/validators"
import { withLargeLoader } from "hoc/withLoader"
import withGetBeaconActivatedStatus from "graphql/withGetBeaconActivatedStatus"

const AccountSetupForm = ({
  form,
  origin,
  onSubmit,
  submitting,
  beaconActivated,
}) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit} className="signup-form">
      <Row>
        <Col span={11} className="name-input">
          <Form.Item label="First Name">
            {form.getFieldDecorator("fname", {
              validateTrigger: false,
              rules: [
                {
                  required: true,
                  message: "This field is required.",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                data-test="AccountSetupForm.FirstName"
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12} offset={1} className="name-input">
          <Form.Item label="Last Name">
            {form.getFieldDecorator("lname", {
              validateTrigger: false,
              rules: [
                {
                  required: true,
                  message: "This field is required.",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                data-test="AccountSetupForm.LastName"
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Email Address">
            {form.getFieldDecorator("email", {
              validateTrigger: false,
              rules: [
                {
                  required: true,
                  message: "This field is required.",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                data-test="AccountSetupForm.Email"
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Password">
            {form.getFieldDecorator("password", {
              rules: [{ validator: passwordStrengthValidator }],
            })(
              <PasswordInput
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                data-test="AccountSetupForm.Password"
                strengthMeter
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Organization Name">
            {form.getFieldDecorator("workspaceName", {
              rules: [
                {
                  required: true,
                  message: "This field is required.",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="bank" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                data-test="AccountSetupForm.WorkspaceName"
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Slug">
            {form.getFieldDecorator("workspaceSlug", {
              initialValue: kebabCase(form.getFieldValue("workspaceName")),
              rules: [
                {
                  required: true,
                  message: "This field is required.",
                },
              ],
            })(
              <Input
                type="text"
                addonBefore={window.location.origin + "/"}
                data-test="AccountSetupForm.WorkspaceSlug"
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      {beaconActivated && (
        <Row>
          <Col span={24}>
            <Form.Item label="Usage Statistics">
              {form.getFieldDecorator("beaconConsent", {
                initialValue: false,
              })(
                  <Switch data-test="AccountSetupForm.BeaconConsent" />
              )}
              <p className="mb-0">
                {t("beacon.prompt")} <a target="_blank" rel="noopener noreferrer" href={t("beacon.docsUrl")}>{t("Learn more")}.</a>
              </p>
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          disabled={submitting}
          data-test="AccountSetupForm.Submit"
        >
          {submitting ? "Creating your account..." : "Create Account"}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default compose(withGetBeaconActivatedStatus, withLargeLoader)(AccountSetupForm)
