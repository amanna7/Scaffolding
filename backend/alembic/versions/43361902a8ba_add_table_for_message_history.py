"""Add table for message history

Revision ID: 43361902a8ba
Revises: 03180c3b47a8
Create Date: 2025-05-28 13:33:07.015932

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '43361902a8ba'
down_revision: Union[str, None] = '03180c3b47a8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
