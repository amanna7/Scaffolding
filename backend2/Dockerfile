FROM python:3-alpine

WORKDIR /backend2

COPY requirements.txt /backend2/
COPY . /backend2/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload", "--proxy-headers", "--forwarded-allow-ips", "*"]
