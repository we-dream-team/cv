# Lambda function pour les notifications
resource "aws_lambda_function" "notify" {
  filename      = "lambda-notify.zip"
  function_name = "${var.project_name}-notify"
  role          = aws_iam_role.lambda_notify_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 128

  environment {
    variables = {
      RESEND_API_KEY       = local.resend_api_key
      RESEND_ACCOUNT_EMAIL = local.resend_account_email
    }
  }

  tags = var.default_tags
}

# IAM role pour Lambda
resource "aws_iam_role" "lambda_notify_role" {
  name = "${var.project_name}-lambda-notify-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attacher la politique de base Lambda
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_notify_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# API Gateway
resource "aws_api_gateway_rest_api" "notify_api" {
  name = "${var.project_name}-notify-api"
  tags = var.default_tags
}

# Resource pour /notify
resource "aws_api_gateway_resource" "notify" {
  rest_api_id = aws_api_gateway_rest_api.notify_api.id
  parent_id   = aws_api_gateway_rest_api.notify_api.root_resource_id
  path_part   = "notify"
}

# Méthode POST
resource "aws_api_gateway_method" "notify_post" {
  rest_api_id   = aws_api_gateway_rest_api.notify_api.id
  resource_id   = aws_api_gateway_resource.notify.id
  http_method   = "POST"
  authorization = "NONE"
}

# Intégration Lambda
resource "aws_api_gateway_integration" "notify_lambda" {
  rest_api_id = aws_api_gateway_rest_api.notify_api.id
  resource_id = aws_api_gateway_resource.notify.id
  http_method = aws_api_gateway_method.notify_post.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.notify.invoke_arn
}

# Permission Lambda pour API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notify.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.notify_api.execution_arn}/*/*/*"
}

# Deployment
resource "aws_api_gateway_deployment" "notify" {
  depends_on = [
    aws_api_gateway_integration.notify_lambda,
  ]

  rest_api_id = aws_api_gateway_rest_api.notify_api.id
  stage_name  = "prod"
}

# Outputs
output "notify_api_url" {
  value = "${aws_api_gateway_deployment.notify.invoke_url}/notify"
}
