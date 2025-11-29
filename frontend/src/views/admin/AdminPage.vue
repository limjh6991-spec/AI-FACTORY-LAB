<template>
  <div class="admin-container">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-gear-fill"></i>
        관리자 페이지
      </h1>
    </div>

    <div class="admin-cards">
      <div class="admin-card card-primary">
        <div class="card-icon">
          <i class="bi bi-file-earmark-code"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">화면 생성</h3>
          <p class="card-description">PI 문서를 입력하여 자동으로 화면을 생성합니다.</p>
          <router-link to="/admin/screen-generator" class="card-action">
            <span>화면 생성하기</span>
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
      </div>

      <div class="admin-card card-success">
        <div class="card-icon">
          <i class="bi bi-list-task"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">메뉴 생성</h3>
          <p class="card-description">시스템 메뉴를 동적으로 생성하고 관리합니다.</p>
          <router-link to="/admin/menu-generator" class="card-action">
            <span>메뉴 생성하기</span>
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="schema-list-card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="bi bi-database"></i>
          생성된 스키마 목록
        </h3>
        <button class="btn-add">
          <i class="bi bi-plus-circle"></i>
          새 스키마 추가
        </button>
      </div>
      <div class="card-body">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>화면명</th>
                <th>생성일</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="schema-id">COST001</td>
                <td class="schema-name">제품별 원가 조회</td>
                <td class="schema-date">2025-01-15</td>
                <td>
                  <span class="status-badge status-active">활성</span>
                </td>
                <td class="actions">
                  <button class="action-btn btn-view" title="보기">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="action-btn btn-edit" title="수정">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="action-btn btn-delete" title="삭제">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="schema-id">COST002</td>
                <td class="schema-name">부서별 원가 조회</td>
                <td class="schema-date">2025-01-14</td>
                <td>
                  <span class="status-badge status-active">활성</span>
                </td>
                <td class="actions">
                  <button class="action-btn btn-view" title="보기">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="action-btn btn-edit" title="수정">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="action-btn btn-delete" title="삭제">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="schema-id">COST003</td>
                <td class="schema-name">원가 추이 분석</td>
                <td class="schema-date">2025-01-13</td>
                <td>
                  <span class="status-badge status-inactive">비활성</span>
                </td>
                <td class="actions">
                  <button class="action-btn btn-view" title="보기">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="action-btn btn-edit" title="수정">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="action-btn btn-delete" title="삭제">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Admin page logic here
</script>

<style lang="scss" scoped>
.admin-container {
  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        color: #1890ff;
      }
    }
  }

  .admin-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .admin-card {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    transition: all 0.3s;
    border-left: 4px solid transparent;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      font-size: 48px;
      margin-right: 20px;
      opacity: 0.8;
    }

    .card-content {
      flex: 1;

      .card-title {
        font-size: 20px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 10px 0;
      }

      .card-description {
        font-size: 14px;
        color: #606266;
        margin: 0 0 15px 0;
        line-height: 1.6;
      }

      .card-action {
        display: inline-flex;
        align-items: center;
        padding: 8px 16px;
        border-radius: 4px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s;

        i {
          margin-left: 8px;
          transition: transform 0.3s;
        }

        &:hover i {
          transform: translateX(4px);
        }
      }
    }

    &.card-primary {
      border-left-color: #1890ff;

      .card-icon {
        color: #1890ff;
      }

      .card-action {
        background: #1890ff;
        color: #fff;

        &:hover {
          background: #40a9ff;
        }
      }
    }

    &.card-success {
      border-left-color: #13ce66;

      .card-icon {
        color: #13ce66;
      }

      .card-action {
        background: #13ce66;
        color: #fff;

        &:hover {
          background: #42d885;
        }
      }
    }
  }

  .schema-list-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
        margin: 0;
        display: flex;
        align-items: center;

        i {
          margin-right: 8px;
          color: #1890ff;
        }
      }

      .btn-add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        background: #1890ff;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;

        i {
          margin-right: 6px;
        }

        &:hover {
          background: #40a9ff;
        }
      }
    }

    .card-body {
      padding: 0;

      .table-container {
        overflow-x: auto;

        .data-table {
          width: 100%;
          border-collapse: collapse;

          thead {
            background: #fafafa;

            tr {
              th {
                padding: 16px 24px;
                text-align: left;
                font-size: 14px;
                font-weight: 600;
                color: #606266;
                border-bottom: 1px solid #f0f0f0;
              }
            }
          }

          tbody {
            tr {
              transition: background 0.3s;

              &:hover {
                background: #fafafa;
              }

              td {
                padding: 16px 24px;
                font-size: 14px;
                color: #606266;
                border-bottom: 1px solid #f0f0f0;

                &.schema-id {
                  font-weight: 600;
                  color: #1890ff;
                }

                &.schema-name {
                  color: #303133;
                  font-weight: 500;
                }

                &.schema-date {
                  color: #909399;
                }

                .status-badge {
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 500;

                  &.status-active {
                    background: #f0f9ff;
                    color: #13ce66;
                  }

                  &.status-inactive {
                    background: #f5f5f5;
                    color: #909399;
                  }
                }

                &.actions {
                  .action-btn {
                    padding: 6px 10px;
                    margin-right: 8px;
                    border: 1px solid #dcdfe6;
                    background: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 14px;

                    &:hover {
                      border-color: #1890ff;
                      color: #1890ff;
                    }

                    &.btn-view:hover {
                      border-color: #1890ff;
                      color: #1890ff;
                      background: #f0f9ff;
                    }

                    &.btn-edit:hover {
                      border-color: #ffba00;
                      color: #ffba00;
                      background: #fffbf0;
                    }

                    &.btn-delete:hover {
                      border-color: #ff4949;
                      color: #ff4949;
                      background: #fff0f0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
